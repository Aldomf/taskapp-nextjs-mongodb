import { NextResponse } from "next/server";
import { connectDB } from "@/utils/mongoose";
import Task from "@/models/Tasks";
import { cookies } from "next/headers";
import Jwt from "jsonwebtoken";

export async function GET(req, { params }) {
  try {
    connectDB();
    const taskFound = await Task.findById(params.id);

    if (!taskFound)
      return NextResponse.json(
        {
          message: "Task not found",
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(taskFound);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export async function DELETE(req, { params }) {
  connectDB();
  try {
    const deletedTask = await Task.findByIdAndDelete(params.id);
    if (!deletedTask)
      return NextResponse.json(
        {
          message: "Task not found",
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(deletedTask);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export async function PUT(req, { params }) {
  connectDB();
  const cookieStore = cookies();

  const { value } = cookieStore.get("myTokenName");

  Jwt.verify(value, "yoursecret", (err, user) => {
    if (err)
      return NextResponse.json({ message: "Invalid token" }, { status: 403 });
    req.user = user;
  });
  try {
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

    const updatedTask = await Task.findByIdAndUpdate(params.id, {title, description}, {
      new: true,
    });
    const updatedTaskSaved = updatedTask.save();
    return NextResponse.json(updatedTaskSaved);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
