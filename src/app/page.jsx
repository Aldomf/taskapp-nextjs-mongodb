"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "@/components/TaskCard";
import Image from "next/image";
import { Oval } from "react-loader-spinner";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { increment, decrement } from "@/redux/features/counter/counterSlice";
import { useGetTasksQuery } from "@/redux/services/tasksApi";

function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  const { data, error, isLoading } = useGetTasksQuery();

  const getTasks = () => {
    axios
      .get("/api/tasks")
      .then((response) => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
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
