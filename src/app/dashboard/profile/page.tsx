import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cookies } from "next/headers";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { TiArrowRight } from "react-icons/ti";
import { Button } from "@/components/ui/button";
import img1 from "@/public/icons/user-level.svg";
import img2 from "@/public/icons/referral.svg";
import img3 from "@/public/icons/security.svg";
import img4 from "@/public/icons/support.svg";
import img5 from "@/public/icons/faq.svg";
import img6 from "@/public/icons/logout.svg";
import Image from "next/image";
import LogoutModal from "@/components/LogoutModal";
import Mobilenav from "@/components/Mobilenav";
import { MdDelete } from "react-icons/md";

async function getUser() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const headers = {
    Authorization: `Bearer ${token?.value}`,
    "Content-Type": "application/json",
  };
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/current-user`,
    {
      headers,
    }
  );

  const user = await res.json();
  return user;
}

const ProfilePage = async () => {
  const userPromise = getUser();
  const [user] = await Promise.all([userPromise]);
  return (
    <section className="lg:pt-0">
      <div className="header bg-[#202020] lg:h-40 h-52 flex items-center ">
        <Link
          href="/dashboard/profile/settings"
          className="lg:w-8/12 w-10/12 mx-auto mt-14 flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-x-3">
            <Avatar className="p-0 m-0 lg:w-24 lg:h-24 w-14 h-14 border border-gray-600">
              <AvatarImage
                className="w-80"
                src={user?.attributes?.profile_picture}
              />
              <AvatarFallback className="font-bold lg:text-2xl">
                {user?.attributes?.first_name[0]}
                {user?.attributes?.last_name[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="lg:text-lg text-base text-white">
                {user?.attributes?.first_name} {user?.attributes?.last_name}
              </h2>
              <p className="text-gray-100 text-xs">Jolly just come</p>
            </div>
          </div>
          <IoIosArrowForward className="text-white lg:text-4xl text-2xl" />
        </Link>
      </div>

      <div className="nav-list lg:w-8/12 w-10/12 space-y-4 mx-auto mt-6">
        <Link
          href="/dashboard/profile/level"
          className="flex justify-between items-center transition-all hover:bg-orange-50 py-4 px-4 rounded-lg">
          <div className="flex items-center space-x-10">
            <Image
              src={img1}
              alt="user level"
              width={25}
              height={25}
              layout="fixed"
            />
            <p className="font-semibold lg:text-lg text-base">User level</p>
          </div>
          <TiArrowRight className="text-3xl font-bold text-gray-600 " />
        </Link>
        <Link
          href="/dashboard/profile/referral"
          className="flex justify-between items-center hover:bg-orange-50 py-4 px-4 rounded-lg">
          <div className="flex items-center space-x-10">
            <Image
              src={img2}
              alt="user level"
              width={25}
              height={25}
              layout="fixed"
            />
            <p className="font-semibold lg:text-lg text-base">Referral</p>
          </div>
          <TiArrowRight className="text-3xl font-bold text-gray-600 " />
        </Link>
        <Link
          href="/dashboard/profile/security"
          className="flex justify-between items-center hover:bg-orange-50 py-4 px-4 rounded-lg">
          <div className="flex items-center space-x-10">
            <Image
              src={img3}
              alt="user level"
              width={25}
              height={25}
              layout="fixed"
            />
            <p className="font-semibold lg:text-lg text-base">Security</p>
          </div>
          <TiArrowRight className="text-3xl font-bold text-gray-600" />
        </Link>
        <Link
          href="/dashboard/profile/support"
          className="flex justify-between items-center hover:bg-orange-50 py-4 px-4 rounded-lg">
          <div className="flex items-center space-x-10">
            <Image
              src={img4}
              alt="user level"
              width={25}
              height={25}
              layout="fixed"
            />
            <p className="font-semibold lg:text-lg text-base">Contact Support</p>
          </div>

          <TiArrowRight className="text-3xl font-bold text-gray-600" />
        </Link>
        <Link
          href="/dashboard/profile/faq"
          className="flex justify-between items-center hover:bg-orange-50 py-4 px-4 rounded-lg">
          <div className="flex items-center space-x-10">
            <Image
              src={img5}
              alt="user level"
              width={25}
              height={25}
              layout="fixed"
            />
            <p className="font-semibold lg:text-lg text-base">FAQ</p>
          </div>

          <TiArrowRight className="text-3xl font-bold text-gray-600" />
        </Link>
        <LogoutModal>
          <Button
            variant="ghost"
            className="flex w-full justify-between items-center hover:bg-orange-50 pt-8 px-4 rounded-lg">
            <div className="flex items-center space-x-10">
              <Image
                src={img6}
                alt="user level"
                width={25}
                height={25}
                layout="fixed"
              />
              <p className="font-semibold lg:text-lg text-sm">Logout</p>
            </div>
            <TiArrowRight className="text-3xl font-bold text-gray-600" />
          </Button>
        </LogoutModal>
        <Button
          variant="ghost"
          className="flex w-full justify-between items-center hover:bg-orange-50 lg:mt-8 mt-10 pt-8 px-4 rounded-lg">
          <div className="flex items-center space-x-10">
            <MdDelete className="text-red-600 h-6 w-6" />
            <p className="font-semibold lg:text-md text-sm text-red-600">
              Delete Account
            </p>
          </div>
        </Button>
      </div>
      <Mobilenav />
    </section>
  );
};

export default ProfilePage;
