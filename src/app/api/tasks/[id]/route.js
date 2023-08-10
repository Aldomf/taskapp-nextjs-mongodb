import { NextResponse } from "next/server";
import { connectDB } from "@/utils/mongoose";
import Task from "@/models/Tasks";

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
  try {
    const data = await req.json();
    const updatedTask = await Task.findByIdAndUpdate(params.id, data, {
      new: true,
    });
    return NextResponse.json(updatedTask);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
