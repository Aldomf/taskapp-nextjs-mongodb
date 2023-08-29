"use client";

import { useEffect } from "react";
import TaskCard from "@/components/TaskCard";
import Image from "next/image";
import { Oval } from "react-loader-spinner";
import { useTasks } from "@/context/TaskContext";

function HomePage() {
  const {getTasksHome, loading, tasks} = useTasks()

  const getTasks = () => {
    getTasksHome()
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className={!tasks.length ? "h-[calc(100vh-15rem)]" : ""}>
      {loading ? (
        <div className="flex justify-center items-center">
          <Oval
            height={20}
            width={20}
            color="white"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#ffffff"
            strokeWidth={7}
            strokeWidthSecondary={7}
          />
          Loading...
        </div>
      ) : tasks.length ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 gap-6">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center">
            There are no tasks
          </h1>
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
