import React from "react";
import { cookies } from "next/headers";
import SettingsForm from "@/components/SettingsForm";

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
      <h1 className="font-bold lg:text-2xl text-lg">Settings Profile</h1>
      <SettingsForm user={user} />
    </section>
  );
};

export default SettingsPage;
