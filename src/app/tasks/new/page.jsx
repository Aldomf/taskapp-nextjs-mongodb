"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const params = useParams();
  const [inputValue, setInputValue] = useState("");

  const getTask = async () => {
    const res = await fetch(`/api/tasks/${params.id}`);
    const data = await res.json();
    setInputValue(data);
  };

  const onSubmit = async (data) => {
    if (!params.id) {
      try {
        const res = await fetch("/api/tasks", {
          method: "POST",
          body: JSON.stringify(data),
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
    } else {
      try {
        const res = await fetch(`/api/tasks/${params.id}`, {
          method: "PUT",
          body: JSON.stringify(data),
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
    }
  };

  async function handleDelete() {
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center lg:w-2/5 lg:h-3/4 w-full"
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
