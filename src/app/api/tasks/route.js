import { NextResponse } from "next/server";
import { connectDB } from "@/utils/mongoose";
import Task from "@/models/Tasks";

export async function GET() {
  connectDB();

  const tasks = await Task.find();

  return NextResponse.json(tasks, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
}

export async function POST(req) {
  try {
    connectDB()
    const data = await req.json();
    const newTask = new Task(data);
    const saveTask = await newTask.save();
    return NextResponse.json(saveTask, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
