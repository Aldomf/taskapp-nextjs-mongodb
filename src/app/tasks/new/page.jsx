"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useTasks } from "@/context/TaskContext";

function FormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createTask, updateTask, deleteTask, error } = useTasks();

  const params = useParams();
  const [inputValue, setInputValue] = useState("");

  const getTask = async () => {
    const res = await fetch(`/api/tasks/${params.id}`);
    const data = await res.json();
    setInputValue(data);
  };

  const onSubmit = async (data) => {
    if (!params.id) {
      createTask(data);
    } else {
      updateTask(data);
    }
  };

  async function handleDelete() {
    deleteTask();
  }

  useEffect(() => {
    if (params.id) {
      getTask();
    }
  }, []);

  return (
    <div className="h-[calc(100vh-7rem)] flex flex-col justify-center items-center">
      <h1 className="text-white font-bold text-4xl">
        {params.id ? "Update Task" : "Create Task"}
      </h1>
      {error && (
        <span className="text-red-600 text-sm md:text-base">{error}</span>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center lg:w-2/5 lg:h-[400px] w-full"
      >
        <input
          type="text"
          placeholder="Title"
          defaultValue={params.id ? inputValue.title : ""}
          {...register("title", { required: true })}
          className="w-full my-4 bg-gray-800 border-2 rounded-lg p-4"
        />
        {!params.id && errors.title && (
          <span className="text-red-600">This field is required</span>
        )}

        <textarea
          placeholder="Description"
          rows={5}
          defaultValue={params.id ? inputValue.description : ""}
          {...register("description", { required: true })}
          className="w-full my-4 bg-gray-800 border-2 rounded-lg p-4"
        ></textarea>
        {!params.id && errors.description && (
          <span className="text-red-600 mb-2">This field is required</span>
        )}

        <div
          className={`flex items-center w-full ${
            params.id ? "justify-between" : "justify-center"
          }`}
        >
          <input
            type="submit"
            value={params.id ? "Update" : "Save"}
            className="bg-green-600 font-bold hover:bg-green-700 hover:cursor-pointer text-white py-2 rounded-lg w-24"
          />
          {params.id && (
            <button
              type="button"
              className="bg-red-600 font-bold hover:bg-red-700 hover:cursor-pointer text-white py-2 rounded-lg w-24"
              onClick={() => {
                handleDelete();
              }}
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default FormPage;
