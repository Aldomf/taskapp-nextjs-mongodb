"use client";

import { useSession, signOut } from "next-auth/react";
import { GoMail } from "react-icons/go";
import { AiOutlineCheckCircle, AiOutlineUser } from "react-icons/ai";

function ProfilePage() {
  const { data: session, status } = useSession();

  console.log(session, status);

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center bg-gray-800 rounded-md p-8 shadow-md mt-5">
        <h1 className="text-5xl mt-4 mb-4">Profile</h1>
        <div className="text-left">
          <div className="mb-4">
            <img
              src="https://robohash.org/628.png"
              alt="profile photo"
              className="border-2 rounded-full"
            />
          </div>
          <div>
            <p className="text-white border-b border-gray-600 pb-4">
              <AiOutlineUser className="text-[#009FBC] text-2xl inline mr-5"/>
              {session?.user.fullname}
            </p>
            <p className="text-white border-b border-gray-600 pb-4 mt-4">
              <GoMail className="text-[#009FBC] text-2xl inline mr-5"/>
              {session?.user.email}
            </p>
            <p className="text-green-500 border-b border-gray-600 pb-4 mt-4">
              <AiOutlineCheckCircle className="text-[#009FBC] text-2xl inline mr-5"/>
              {status}
            </p>
          </div>
        </div>
        <button
          className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-md mt-4"
          onClick={() => {
            if (window.confirm("Are you sure you want to sign out?")) {
              signOut();
            }
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
