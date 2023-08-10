import { connectDB } from "@/utils/mongoose";
import Task from "@/models/Tasks";
import TaskCard from "@/components/TaskCard";
import Image from "next/image";

async function loadTasks() {
  connectDB();
  const tasks = await Task.find();
  return tasks;
}

async function HomePage() {
  const tasks = await loadTasks();
  const taskCount = tasks.length;
  console.log(taskCount);
  return (
    <div className={!taskCount ? "h-[calc(100vh-15rem)]" : ""}>
      {taskCount ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 gap-6">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center">There are no tasks</h1>
          <Image
            src="/noTasks.png"
            alt="Picture of the author"
            width={90}
            height={90}
          />
        </div>
      )}
    </div>
  );
}

export default HomePage;
