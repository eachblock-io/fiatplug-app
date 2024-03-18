import React from "react";
import { cookies } from "next/headers";
import SettingsForm from "@/components/SettingsForm";
import { FaArrowLeft } from "react-icons/fa6";
import Link from "next/link";

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

const SettingsPage = async () => {
  const userPromise = getUser();
  const [user] = await Promise.all([userPromise]);
  return (
    <section className=" lg:w-11/12 w-10/12 mx-auto mt-20">
      <div className="flex items-center relative">
        <Link href="/dashboard/profile" className="text-2xl">
          <FaArrowLeft />
        </Link>
        <h1 className="font-semibold text-center lg:text-2xl text-lg absolute left-[8rem]">
          Profile
        </h1>
      </div>
      <SettingsForm user={user} />
    </section>
  );
};

export default SettingsPage;
