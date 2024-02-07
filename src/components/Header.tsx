"use client";
import { useState } from "react";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { IoNotifications } from "react-icons/io5";
import Logo from "@/public/logo.png";
import Image from "next/image";
import { NotificationDropdown } from "./NotificationDropdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = ({ onClick, data }: any) => {
  const [toggle, setToggle] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);

  const handleToggleNotify = () => {
    setToggle(!toggle);
  };

  return (
    <div className="flex justify-between items-center sticky top-0 bg-white  lg:px-14 px-4 mx-auto h-[10vh] border-b border-gray-300 shadow-sm z-20 w-full">
      {/* <HiOutlineBars3BottomLeft
        onClick={onClick}
        className="lg:hidden block text-main text-4xl cursor-pointer"
      /> */}
      <div className="flex items-center space-x-2 lg:hidden">
        <Avatar className="p-0 m-0">
          <AvatarImage src={data?.profile_picture} />
          <AvatarFallback className="font-bold">
            {data?.first_name[0]}
            {data?.last_name[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-bold">Hi, {data?.first_name}</p>
          {/* <p className="text-sm text-gray-500 ">
            {data?.email?.slice(0, 12)}....
          </p> */}
        </div>
      </div>
      {/* <Image
        src={Logo}
        width="100"
        alt="Logo"
        className="w-20 lg:hidden flex"
      /> */}
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
        {/* <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center space-x-4 border py-2 px-4 rounded-lg">
            <Avatar className="p-0 m-0">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AY</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
      <NotificationDropdown
        handleToggleNotify={handleToggleNotify}
        toggle={toggle}
      />
    </div>
  );
};

export default Header;
