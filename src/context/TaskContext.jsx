"use client";

import { createContext, useState, useContext } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useAuth must be used within a TaskProvider");
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const params = useParams();
  const router = useRouter();
  const [tasksCounter, setTasksCounter] = useState();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTasksCounter = async () => {
    try {
      const res = await axios.get("/api/tasks");
      setTasksCounter(res.data.length);
      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getTasksHome = async (user) => {
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

  const createTask = async (task) => {
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify(task),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      if (res.ok) {
        const datas = await res.json();
        toast.success("Create successful!");
        router.push("/");
        router.refresh();
        console.log(datas);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (task) => {
    try {
      const res = await fetch(`/api/tasks/${params.id}`, {
        method: "PUT",
        body: JSON.stringify(task),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      if (res.ok) {
        toast.success("Update successful!");
        const datas = await res.json();
        console.log(datas);
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        const res = await fetch(`/api/tasks/${params.id}`, {
          method: "DELETE",
        });
        if (!res.ok) {
          throw new Error("Something went wrong");
        }

        if (res.ok) {
          const datas = await res.json();
          toast.success("Delete successful!");
          router.push("/");
          router.refresh();
          console.log(datas);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <TaskContext.Provider
      value={{
        getTasksCounter,
        getTasksHome,
        createTask,
        updateTask,
        deleteTask,
        tasksCounter,
        tasks,
        loading,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
