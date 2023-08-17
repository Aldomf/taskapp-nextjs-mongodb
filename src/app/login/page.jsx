"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [resError, setResError] = useState("");
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const resSignIn = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (resSignIn.error) return setResError(resSignIn.error)

      if (resSignIn.ok) return router.push("/dashboard");
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-[calc(100vh-7rem)] flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-4">Sign in</h1>
      {resError && (
        <span className="text-red-600 text-sm md:text-base">{resError}</span>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center lg:w-2/5 lg:h-2/4 w-full bg-gray-800 p-5 rounded-md"
      >
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
          value="Log in"
          className="bg-green-600 font-bold hover:bg-green-700 hover:cursor-pointer text-white py-2 rounded-lg w-24"
        />
      </form>
    </div>
  );
}

export default LoginPage;