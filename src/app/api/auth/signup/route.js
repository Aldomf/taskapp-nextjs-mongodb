import { NextResponse } from "next/server";
import User from "@/models/Users";
import { connectDB } from "@/utils/mongoose";
import bcrypt from "bcryptjs";

export async function POST(request) {
  const { fullname, email, password } = await request.json();
  console.log(fullname, email, password);

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
    console.log(savedUser);

    return NextResponse.json({
      email: savedUser.email,
      fullname: savedUser.fullname,
      _id: savedUser._id
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
