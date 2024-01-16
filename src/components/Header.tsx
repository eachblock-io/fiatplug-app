"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import Link from "next/link";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoNotifications } from "react-icons/io5";

const Header = ({ onClick }: any) => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);

  return (
    <div className="flex justify-between items-center sticky top-0 bg-white  lg:px-14 px-4 mx-auto py-4 border-b border-gray-300 shadow-sm  w-full">
      <HiOutlineBars3BottomLeft
        onClick={onClick}
        className="lg:hidden block text-main text-4xl cursor-pointer"
      />
      <div className="logo lg:hidden text-center pt-4 flex items-center space-x-2">
        <div className="h-4 w-4 bg-zinc-800"></div>
        <h2 className="font-bold text-sm">FiatPlug</h2>
      </div>
      <h2 className="font-bold lg:block hidden">Welcome back, Cay</h2>
      <div className="profile flex items-center space-x-4">
        <IoNotifications className="text-2xl" />
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
    </div>
  );
};

export default Header;
