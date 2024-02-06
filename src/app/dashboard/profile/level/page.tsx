import React from "react";
import { cookies } from "next/headers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

const LevelPage = async () => {
  const userPromise = getUser();
  const [user] = await Promise.all([userPromise]);
  return (
    <section className=" lg:w-6/12 w-11/12 mx-auto">
      <h2 className="font-semibold lg:text-left text-center lg:text-2xl text-lg mt-4">
        User level
      </h2>
      <div className="card">
        <div className="flex items-center gap-x-3 border shadow-md rounded-md py-6 px-10  mt-10">
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
            <h2 className="font-bold lg:text-lg text-xs">
              {user?.attributes?.first_name} {user?.attributes?.last_name}
            </h2>
            <p className="text-gray-500">{user?.attributes?.email}</p>
            <p className="text-gray-500">Jolly just come</p>
          </div>
        </div>
        <div className=" mt-10 space-y-10">
          <div className=" w-full">
            <p className="py-5 px-10 text-gray-500 rounded-full bg-orange-50 lg:text-2xl font-medium">
              Jolly Just Come
            </p>
          </div>
          <div className=" w-full">
            <p className="py-5 px-10 text-gray-500 rounded-full bg-orange-50 lg:text-2xl font-medium">
              Chairman
            </p>
          </div>
          <div className=" w-full">
            <p className="py-5 px-10 text-gray-500 rounded-full bg-orange-50 lg:text-2xl font-medium">
              Governor
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LevelPage;
