"use client";
import { useState } from "react";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { IoNotifications } from "react-icons/io5";
import Logo from "@/public/logo.png";
import Image from "next/image";
import { NotificationDropdown } from "./NotificationDropdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { TbLogout } from "react-icons/tb";
import { Button } from "./ui/button";

const Header = ({ data }: any) => {
  const [toggle, setToggle] = useState(false);

  const handleToggleNotify = () => {
    setToggle(!toggle);
  };

  const handleLogout = () => {
    console.log("Logo out");
  };

  return (
    <div className="flex justify-between items-center sticky top-0 bg-white  lg:px-14 px-6 mx-auto h-[10vh] border-b border-gray-300 shadow-sm z-20 w-full">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center space-x-2 lg:hidden">
          <Avatar className="p-0 m-0">
            <AvatarImage src={data?.profile_picture} />
            <AvatarFallback className="font-bold">
              {data?.first_name[0]}
              {data?.last_name[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-bold">Hi, {data?.first_name}</p>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Button
              onSubmit={handleLogout}
              variant="ghost"
              className="flex w-full items-center justify-start hover:font-semibold space-x-2 text-gray-600 hover:bg-gray-100 py-3 px-2 rounded-xl transition-all">
              <TbLogout className="text-2xl text-gray-500 hover:text-zinc-800" />
              <p>Logout</p>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <h2 className="font-bold lg:block hidden">Hi, {data?.first_name}</h2>
      <div className="profile flex items-center space-x-4">
        <div className="relative">
          <IoNotifications
            className="text-3xl text-gray-600"
            onClick={handleToggleNotify}
          />
          <div className="flex items-center justify-center bg-[#FF1A1A] text-white h-5 w-5 rounded-full absolute top-[-0.4rem] right-[-0.4rem] ">
            <p className="font-bold text-[0.6rem] ">10</p>
          </div>
        </div>
      </div>
      <NotificationDropdown
        handleToggleNotify={handleToggleNotify}
        toggle={toggle}
      />
    </div>
  );
};

export default Header;
