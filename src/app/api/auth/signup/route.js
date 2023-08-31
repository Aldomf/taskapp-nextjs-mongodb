import { NextResponse } from "next/server";
import User from "@/models/Users";
import { connectDB } from "@/utils/mongoose";
import bcrypt from "bcryptjs";
import { createAccessToken } from "@/libs/jwt";
import { serialize } from "cookie";

export async function POST(request) {
  const { fullname, email, password } = await request.json();
  

  if (!password || password.length < 6)
    return NextResponse.json(
      {
        message: "Password must be at least 6 characters",
      },
      {
        status: 400,
      }
    );

  try {
    await connectDB();
    const userFound = await User.findOne({ email });

    if (userFound)
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 409 }
      );

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      email,
      fullname,
      password: hashedPassword,
    });

    const savedUser = await user.save();
    
    const token = await createAccessToken({ id: savedUser._id });

    const serialized = serialize("myTokenName", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 30,
      path: "/",
    });

    const response = {
      message: "Authenticated",
      email: savedUser.email,
      fullname: savedUser.fullname,
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
