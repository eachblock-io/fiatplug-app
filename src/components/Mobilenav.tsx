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
import { usePathname } from "next/navigation";
import { AiFillMessage } from "react-icons/ai";

interface LinkItem {
  id: number;
  title: string;
  link: string;
  icon: any;
}

const Mobilenav = () => {
  const pathname = usePathname();

  const links: LinkItem[] = [
    {
      id: 1,
      title: "Home",
      icon: (
        <MdSpaceDashboard
          className={`text-3xl mx-auto text-gray-500 ${
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
          className={`text-3xl mx-auto text-gray-500 ${
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
          className={`text-3xl mx-auto text-gray-500 ${
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
        <AiFillMessage
          className={`text-3xl mx-auto text-gray-500 ${
            pathname === "/dashboard/chat" && ` text-orange-400`
          }`}
        />
      ),
      link: "/dashboard/chat",
    },
    {
      id: 4,
      title: "Profile",
      icon: (
        <FaUserCircle
          className={`text-3xl mx-auto text-gray-500 ${
            pathname === "/dashboard/profile" && ` text-orange-400`
          }`}
        />
      ),
      link: "/dashboard/profile",
    },
  ];
  return (
    <div className="border lg:hidden px-6 flex items-center justify-center h-[12vh] w-full fixed left-0 bottom-0 right-0 z-10 bg-white">
      <nav className="w-full flex items-center justify-between">
        {links?.map((data) => (
          <Link
            key={data?.id}
            href={data?.link}
            className={`hover:font-semibold text-center text-gray-500 rounded-xl transition-all ${
              pathname === data?.link ? `font-semibold` : ``
            }`}>
            {data?.icon}
            <p className="text-xs mt-1">{data?.title}</p>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Mobilenav;
