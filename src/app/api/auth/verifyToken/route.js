import { NextResponse } from "next/server";
import User from "@/models/Users";
import { connectDB } from "@/utils/mongoose";
import { cookies } from "next/headers";
import Jwt from "jsonwebtoken";

export async function GET(req) {
    connectDB()
  const cookieStore = cookies();
  const {value} = cookieStore.get("myTokenName");
  console.log(value);

  if (!value)
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );

  try {
    Jwt.verify(value, "yoursecret", async (err, user) => {
        if (err)
          return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    
        req.user = user;
        const userFound = await User.findById(req.user.id);
        console.log(userFound)
        if (!userFound)
          return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    
        return NextResponse.json(userFound);
      });
  } catch (error) {
    console.log(error)
  }
}
