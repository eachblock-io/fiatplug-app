"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { SiBookstack } from "react-icons/si";
import { MdSpaceDashboard } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { IoWallet } from "react-icons/io5";
import { SiGooglemessages } from "react-icons/si";
import { TbLogout } from "react-icons/tb";
import Logo from "@/public/logo.png";
import Image from "next/image";

export function Sidenav({ data }: any) {
  return (
    <div
      className={`lg:h-screen lg:w-[20rem] border-r border-gray-300 shadow-sm transform translate-x-[-100%] lg:translate-x-0 lg:relative absolute left-0 p-6 transition ease-in-out duration-100`}>
      <Image src={Logo} width="200" alt="Logo" className="w-[100px]" />
      <div className="profile flex items-center space-x-6 mt-8 w-full ">
        <div className="flex items-center space-x-4 border py-2 px-4 w-full rounded-lg">
          <Avatar className="p-0 m-0">
            <AvatarImage src={data?.profile_picture} />
            <AvatarFallback className="font-bold">
              {data?.first_name[0]}
              {data?.last_name[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold">
              {data?.first_name} {data?.last_name}
            </p>
            <p className="text-sm text-gray-500 ">
              {data?.email?.slice(0, 12)}....
            </p>
          </div>
        </div>
      </div>
      <nav className="mt-8 space-y-2">
        <Link
          href="/dashboard"
          className="flex items-center hover:font-semibold space-x-2 text-gray-600 hover:bg-gray-100 py-3 px-2 rounded-xl transition-all">
          <MdSpaceDashboard className="text-2xl text-gray-500 hover:text-zinc-800" />
          <p>Home</p>
        </Link>
        <Link
          href="/account"
          className="flex items-center hover:font-semibold space-x-2 text-gray-600 hover:bg-gray-100 py-3 px-2 rounded-xl transition-all">
          <IoWallet className="text-2xl text-gray-500 hover:text-zinc-800" />
          <p>Account</p>
        </Link>
        <Link
          href="/dashboard/orders"
          className="flex items-center hover:font-semibold space-x-2 text-gray-600 hover:bg-gray-100 py-3 px-2 rounded-xl transition-all">
          <SiBookstack className="text-2xl text-gray-500 hover:text-zinc-800" />
          <p>Orders</p>
        </Link>
        <Link
          href="/dashboard/chat"
          className="flex items-center hover:font-semibold space-x-2 text-gray-600 hover:bg-gray-100 py-3 px-2 rounded-xl transition-all">
          <SiGooglemessages className="text-2xl text-gray-500 hover:text-zinc-800" />
          <p>Messages</p>
        </Link>
        {/* <Link
          href="/dashboard"
          className="flex items-center hover:font-semibold space-x-2 text-gray-600 hover:bg-gray-100 py-3 px-2 rounded-xl transition-all">
          <FaUser className="text-2xl text-gray-500 hover:text-zinc-800" />
          <p>Profile</p>
        </Link> */}
        <Link
          href="/dashboard"
          className="flex items-center hover:font-semibold space-x-2 text-gray-600 hover:bg-gray-100 py-3 px-2 rounded-xl transition-all">
          <IoSettingsSharp className="text-2xl text-gray-500 hover:text-zinc-800" />
          <p className="text-md">Settings</p>
        </Link>
        {/* <Link
          href="/dashboard"
          className="flex items-center hover:font-semibold space-x-2 text-gray-600 hover:bg-gray-100 py-3 px-2 rounded-xl transition-all">
          <GiWorld className="text-2xl text-gray-500 hover:text-zinc-800" />
          <p>Feedback</p>
        </Link> */}
        <div className="flex items-center hover:font-semibold space-x-2 text-gray-600 hover:bg-gray-100 py-3 px-2 rounded-xl transition-all">
          <TbLogout className="text-2xl text-gray-500 hover:text-zinc-800" />
          <p>Logout</p>
        </div>
      </nav>
    </div>
  );
}
