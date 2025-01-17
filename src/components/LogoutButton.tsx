"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { CiLogout } from "react-icons/ci";
import { IoAppsOutline, IoShieldOutline } from "react-icons/io5";

export default function LogoutButton() {
  const { data: session, status } = useSession();

  console.log({ status });

  if (status === "loading") {
    return (
      <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
        <IoShieldOutline />
        <span className="group-hover:text-gray-700">Wait...</span>
      </button>
    );
  }

  if (status === "unauthenticated") {
    return (
      <button
        onClick={() => signIn()}
        className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
      >
        <IoAppsOutline />
        <span className="group-hover:text-gray-700">Enter</span>
      </button>
    );
  }

  return (
    <button
      onClick={() => signOut()}
      className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
    >
      <CiLogout />
      <span className="group-hover:text-gray-700">Logout</span>
    </button>
  );
}
