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
    <section>
      <div className="header bg-black lg:h-40 h-28 flex items-center justify-start ">
        <Link
          href="/dashboard/profile/settings"
          className="lg:w-8/12 w-10/12 mx-auto flex items-center justify-between cursor-pointer">
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
              <h2 className="font-bold lg:text-lg text-xs text-white">
                {user?.attributes?.first_name} {user?.attributes?.last_name}
              </h2>
              <p className="text-gray-100">Jolly just come</p>
            </div>
          </div>
          <IoIosArrowForward className="text-white lg:text-4xl text-2xl" />
        </Link>
      </div>

      <div className="nav-list lg:w-8/12 w-10/12 mx-auto mt-10">
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
            <p className="font-semibold lg:text-lg text-sm">User level</p>
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
            <p className="font-semibold lg:text-lg text-sm">Referral</p>
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
            <p className="font-semibold lg:text-lg text-sm">Security</p>
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
            <p className="font-semibold lg:text-lg text-sm">Contact Support</p>
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
            <p className="font-semibold lg:text-lg text-sm">FAQ</p>
          </div>

          <TiArrowRight className="text-3xl font-bold text-gray-600" />
        </Link>
        <Button
          variant="ghost"
          className="flex w-full justify-between items-center hover:bg-orange-50 py-4 px-4 rounded-lg">
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
        <Button
          variant="ghost"
          className="flex w-full justify-between items-center hover:bg-orange-50 mt-3 py-4 px-4 rounded-lg">
          <div className="flex items-center space-x-10">
            <p className="font-semibold lg:text-md text-sm text-red-400">
              Delete Account
            </p>
          </div>

          <TiArrowRight className="text-3xl font-bold text-gray-600" />
        </Button>
      </div>
    </section>
  );
};

export default ProfilePage;
