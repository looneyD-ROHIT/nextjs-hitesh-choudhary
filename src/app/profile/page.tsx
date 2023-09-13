"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      console.log("Logout successful!!!");
      toast.success("Logout successful!!!");
      router.push("/login");
    } catch (error: any) {
      console.log("Error in logout: ", error);
      toast.error(error.message);
    }
  };
  const [data, setData] = useState("nothing");
  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <h2 className="p-1 rounded bg-green-500">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        onClick={logout}
        className="p-2 mt-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-400 hover:bg-zinc-600"
      >
        Logout
      </button>
      <button
        onClick={getUserDetails}
        className="p-2 mt-4 border border-green-300 rounded-lg mb-4 focus:outline-none focus:border-green-400 hover:bg-green-600"
      >
        GetUserDetails
      </button>
    </div>
  );
}
