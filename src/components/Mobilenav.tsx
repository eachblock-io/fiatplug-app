import React from "react";
import { RiCloseLine } from "react-icons/ri";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { SiBookstack } from "react-icons/si";
import { MdSpaceDashboard } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import { IoWallet } from "react-icons/io5";
import { SiGooglemessages } from "react-icons/si";
import { TbLogout } from "react-icons/tb";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FaUserCircle } from "react-icons/fa";

const Mobilenav = ({ handleToggle, toggle }: any) => {
  return (
    <div
      className={`h-screen w-full fixed left-0 top-0 right-0 z-10 transition ease-in-out duration-800 bg-gradient-to-r from-primary to-transparent transform lg:translate-x-[-100rem] ${
        toggle ? `translate-x-0` : `translate-x-[-100rem]`
      }`}>
      <div className="bg-gray-100 h-screen w-72 border-r border-gray-600 transform translate-x-0 sm:relative absolute left-0 transition ease-in-out overflow-auto delay-1000 duration-1000">
        <RiCloseLine
          onClick={handleToggle}
          className="text-zinc-800 fixed right-2 top-3 text-2xl cursor-pointer"
        />

        {/* Nav */}
        <div className="px-4">
          <div className="profile flex items-center space-x-6 mt-14 w-full ">
            <div className="flex items-center space-x-4 border py-2 px-4 w-full rounded-lg">
              <Avatar className="p-0 m-0">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>AY</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold">Eachblock</p>
                <p className="text-sm text-gray-500 ">eachblock.feather.blog</p>
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
              href="/dashboard/account"
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
              href="/dashboard/messages"
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
              href="/dashboard/profile"
              className="flex items-center hover:font-semibold space-x-2 text-gray-600 hover:bg-gray-100 py-3 px-2 rounded-xl transition-all">
              <FaUserCircle className="text-2xl text-gray-500 hover:text-zinc-800" />
              <p className="text-md">Profile</p>
            </Link>
            <div className="flex cursor-pointer items-center hover:font-semibold space-x-2 text-gray-600 hover:bg-gray-100 py-3 px-2 rounded-xl transition-all">
              <TbLogout className="text-2xl text-gray-500 hover:text-zinc-800" />
              <p className="cursor-pointer">Logout</p>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Mobilenav;
