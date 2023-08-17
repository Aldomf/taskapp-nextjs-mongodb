"use client"

import { signOut } from "next-auth/react";

function SignOut() {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
      <div className="flex flex-col justify-around items-center h-60 md:w-1/2 lg:w-1/3 w-full bg-gray-800 rounded-lg">
        <h1 className="text-3xl">Signout</h1>
        <p>Are you sure you want to sign out?</p>
        <button
          className="bg-red-600 hover:bg-red-700 w-4/5 py-2 rounded-md"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

export default SignOut;
