"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "@/components/TaskCard";
import Image from "next/image";

function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/tasks")
      .then((response) => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className={!tasks.length ? "h-[calc(100vh-15rem)]" : ""}>
      {loading ? (
        <div>Loading...</div> // Add a loading indicator here if needed
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
