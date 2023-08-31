import { NextResponse } from "next/server";
import { connectDB } from "@/utils/mongoose";
import Task from "@/models/Tasks";
import { cookies } from "next/headers";
import Jwt from "jsonwebtoken";

export async function GET(req) {
  connectDB();

  const cookieStore = cookies();

  const { value } = cookieStore.get("myTokenName");

  Jwt.verify(value, "yoursecret", (err, user) => {
    if (err)
      return NextResponse.json({ message: "Invalid token" }, { status: 403 });
    req.user = user;
  });

  const tasks = await Task.find({ user: req.user.id });


  return NextResponse.json(tasks);
}

export async function POST(req) {
  const cookieStore = cookies();

  const { value } = cookieStore.get("myTokenName");

  Jwt.verify(value, "yoursecret", (err, user) => {
    if (err)
      return NextResponse.json({ message: "Invalid token" }, { status: 403 });
    req.user = user;
  });
  try {
    connectDB();
    const { title, description } = await req.json();
    const taskFound = await Task.findOne({ title, user: req.user.id });
    if (taskFound)
      return NextResponse.json(
        {
          message: "Title already exists",
        },
        {
          status: 400,
        }
      );

    const newTask = new Task({ title, description, user: req.user.id });
   
    const saveTask = await newTask.save();
    return NextResponse.json(saveTask);
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
