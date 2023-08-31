import { NextResponse } from "next/server";
import User from "@/models/Users";
import { connectDB } from "@/utils/mongoose";
import bcrypt from "bcryptjs";
import { createAccessToken } from "@/libs/jwt";
import { serialize } from "cookie";

export async function POST(request) {
  const { email, password } = await request.json();
  

  try {
    await connectDB();

    const userFound = await User.findOne({ email }).select("+password");
    if (!userFound) throw new Error("Invalid credentials");
    

    const passwordMatch = await bcrypt.compare(password, userFound.password);
    if (!passwordMatch) throw new Error("Invalid credentials");

    const token = await createAccessToken({ id: userFound._id });

    const serialized = serialize("myTokenName", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 30,
      path: "/",
    });

    const response = {
      message: "Authenticated",
      email: userFound.email,
      fullname: userFound.fullname,
    };
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Set-Cookie": serialized },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 400,
      }
    );
  }
}
