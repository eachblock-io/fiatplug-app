"use client";
import { useState, useEffect } from "react";
import { RiCloseLine } from "react-icons/ri";
import { FaBell } from "react-icons/fa6";
import { formatTime } from "@/lib/utils";
import moment from "moment";
import { dateFormaterAndTime } from "@/utils";
import fetchToken from "@/lib/auth";
import { IoNotifications } from "react-icons/io5";
import BellImg from "@/public/bell.png";
import Image from "next/image";

export const NotificationDropdown = () => {
  const [toggle, setToggle] = useState(false);
  const [notification, setNotification] = useState<any>();
  useEffect(() => {
    getNotification();
  }, []);

  const getNotification = async () => {
    try {
      const token = await fetchToken();
      const headers = {
        Authorization: `Bearer ${token?.data?.token}`,
        "Content-Type": "application/json",
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/notification/user`,
        {
          headers,
        }
      );

      const data = await res.json();
      setNotification(data?.data);
    } catch (error) {}
  };

  const handleReadAll = async () => {
    setToggle(true);
    try {
      const token = await fetchToken();
      const headers = {
        Authorization: `Bearer ${token?.data?.token}`,
        "Content-Type": "application/json",
      };
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/notification/mark-all-notification-read`,
        {
          headers,
        }
      );
      getNotification();
    } catch (error) {}
  };

  return (
    <div>
      <div className="profile flex items-center space-x-4">
        <div className="relative">
          <IoNotifications
            className="text-3xl text-gray-600 cursor-pointer"
            onClick={handleReadAll}
          />
          {notification?.no_of_unread === 0 ? null : (
            <div className="flex items-center justify-center bg-[#FF1A1A] text-white h-5 w-5 rounded-full absolute top-[-0.4rem] right-[-0.4rem] ">
              <p className="font-bold text-[0.6rem] ">
                {notification?.no_of_unread}
              </p>
            </div>
          )}
        </div>
      </div>

      <div
        className={`h-screen lg:w-96 w-full fixed right-0 top-0 z-10 transition ease-in-out duration-800 bg-gradient-to-r from-[#313131] to-transparent transform ${
          toggle ? `translate-x-[100]` : `translate-x-[100%]`
        }`}>
        <div className="absolute right-0 h-screen pt-8 pb-5 transition duration-1000 ease-in-out delay-1000 transform translate-x-0 px-7 bg-amber-50 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] lg:w-96 w-full overflow-y-auto">
          <h1 className="text-base font-semibold text-center">Notifications</h1>
          {notification?.attributes?.length > 0 ? (
            <div className="list mt-8 space-y-4">
              {notification?.attributes?.slice(0, 4).map((data: any) => (
                <div
                  key={data?.id}
                  className="card bg-white drop-shadow-xl p-6 border rounded-md">
                  <p className="text-xs mb-2">
                    {dateFormaterAndTime(data?.created_at)}
                  </p>
                  <div className="flex space-x-4">
                    <div>
                      <div className="icon bg-amber-100 h-12 w-12 rounded-full flex items-center justify-center">
                        <FaBell className="text-amber-500" />
                      </div>
                    </div>
                    <div>
                      <h2 className="font-semibold text-md">
                        {data?.data?.title} 🎉
                      </h2>
                      <p className="text-xs">{data?.data?.message}</p>
                      <p className="text-xs mt-3">
                        {moment(data?.created_at).format("HH:mm:ss")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-[15rem] w-6/12 mx-auto flex items-center justify-center">
              <div className="text-center">
                <Image
                  src={BellImg}
                  alt="notification"
                  width="120"
                  height="120"
                  layout="fixed"
                  className="mx-auto"
                />
                <p className="text-xs">
                  Your recent notifications will appear here
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="fixed right-6 top-5 flex items-center justify-center bg-white h-10 w-10 rounded-full">
          <RiCloseLine
            onClick={() => setToggle(false)}
            className=" text-2xl cursor-pointer text-gray-800 "
          />
        </div>
      </div>
    </div>
  );
};
