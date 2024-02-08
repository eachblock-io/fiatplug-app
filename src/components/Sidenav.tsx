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
import { FaUserCircle } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

interface LinkItem {
  id: number;
  title: string;
  link: string;
  icon: any;
}

export function Sidenav({ data }: any) {
  const pathname = usePathname();

  const links: LinkItem[] = [
    {
      id: 1,
      title: "Home",
      icon: (
        <MdSpaceDashboard
          className={`text-2xl text-gray-500 hover:text-zinc-800 ${
            pathname === "/dashboard" && ` text-orange-400`
          }`}
        />
      ),
      link: "/dashboard",
    },
    {
      id: 2,
      title: "Account",
      icon: (
        <IoWallet
          className={`text-2xl text-gray-500 hover:text-zinc-800 ${
            pathname === "/dashboard/account" && ` text-orange-400`
          }`}
        />
      ),
      link: "/dashboard/account",
    },
    {
      id: 3,
      title: "Orders",
      icon: (
        <SiBookstack
          className={`text-2xl text-gray-500 hover:text-zinc-800 ${
            pathname === "/dashboard/orders" && ` text-orange-400`
          }`}
        />
      ),
      link: "/dashboard/orders",
    },
    {
      id: 4,
      title: "Message",
      icon: (
        <SiGooglemessages
          className={`text-2xl text-gray-500 hover:text-zinc-800 ${
            pathname === "/dashboard/chat" && ` text-orange-400`
          }`}
        />
      ),
      link: "/dashboard/chat",
    },
    {
      id: 5,
      title: "Profile",
      icon: (
        <FaUserCircle
          className={`text-2xl text-gray-500 hover:text-zinc-800 ${
            pathname === "/dashboard/profile" && ` text-orange-400`
          }`}
        />
      ),
      link: "/dashboard/profile",
    },
  ];

  const handleLogout = () => {
    console.log("Logo out");
  };
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
        {links?.map((data) => (
          <Link
            key={data?.id}
            href={data?.link}
            className={`flex items-center hover:font-semibold space-x-2 text-gray-600 hover:bg-gray-100 py-3 px-2 rounded-xl transition-all ${
              pathname === data?.link ? `bg-gray-100 font-semibold` : ``
            }`}>
            <div className="text-orange-500">{data?.icon}</div>
            <p>{data?.title}</p>
          </Link>
        ))}
        <Button
          onSubmit={handleLogout}
          variant="ghost"
          className="flex w-full items-center justify-start hover:font-semibold space-x-2 text-gray-600 hover:bg-gray-100 py-3 px-2 rounded-xl transition-all">
          <TbLogout className="text-2xl text-gray-500 hover:text-zinc-800" />
          <p>Logout</p>
        </Button>
      </nav>
    </div>
  );
}
