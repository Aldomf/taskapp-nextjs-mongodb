"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [resError, setResError] = useState("");
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/api/auth/signup", {
        fullname: data.fullname,
        email: data.email,
        password: data.password,
      });
      console.log(res);
      setResError("");

      const resSignIn = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      console.log(resSignIn);
      if (resSignIn.ok) return router.push("/dashboard");
      
    } catch (error) {
      console.log(error);
      setResError(error.response?.data.message);
    }
  };

  return (
    <div className="h-[calc(100vh-7rem)] flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-4">Sign up</h1>
      {resError && (
        <span className="text-red-600 text-sm md:text-base">{resError}</span>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center lg:w-2/5 lg:h-2/3 w-full bg-gray-800 p-5 rounded-md"
      >
        <input
          type="text"
          name="fullname"
          placeholder="John Smith"
          className="w-full my-4 bg-gray-800 border-2 rounded-lg p-4"
          {...register("fullname", { required: true })}
        />
        {errors.fullname && (
          <span className="text-red-600">This field is required</span>
        )}
        <input
          {...register("email", { required: true })}
          type="email"
          placeholder="johnsmith@mail.com"
          name="email"
          className="w-full my-4 bg-gray-800 border-2 rounded-lg p-4"
        />
        {errors.email && (
          <span className="text-red-600">This field is required</span>
        )}
        <input
          {...register("password", { required: true })}
          type="password"
          placeholder="*******"
          name="password"
          className="w-full my-4 bg-gray-800 border-2 rounded-lg p-4"
        />
        {errors.password && (
          <span className="text-red-600 mb-2">This field is required</span>
        )}
        <input
          type="submit"
          value="Sign up"
          className="bg-green-600 font-bold hover:bg-green-700 hover:cursor-pointer text-white py-2 rounded-lg w-24"
        />
      </form>
    </div>
  );
}

export default RegisterPage;
