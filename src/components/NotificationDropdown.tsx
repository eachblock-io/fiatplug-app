"use client";
import React from "react";
import { RiCloseLine } from "react-icons/ri";
import { FaBell } from "react-icons/fa6";
// import { formatTime } from "@/lib/utils";
// import moment from "moment";
// import { dateFormaterAndTime } from "@/utils";

export const NotificationDropdown = ({ handleToggleNotify, toggle }: any) => {

  return (
    <div
      className={`h-screen lg:w-96 w-full fixed right-0 top-0 z-10 transition ease-in-out duration-800 bg-gradient-to-r from-[#313131] to-transparent transform ${
        toggle ? `translate-x-[100]` : `translate-x-[100%]`
      }`}>
      <div className="absolute right-0 h-screen pt-8 pb-5 transition duration-1000 ease-in-out delay-1000 transform translate-x-0 px-7 bg-amber-50 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] lg:w-96 w-full overflow-y-auto">
        <h1 className="font-bold text-xl">Notifications</h1>
        <div className="list mt-8 space-y-4">
          {/* {data?.data?.attributes?.map((data: any) => (
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
          ))} */}
        </div>
      </div>
      <div className="fixed right-6 top-5 flex items-center justify-center bg-white h-10 w-10 rounded-full">
        <RiCloseLine
          onClick={handleToggleNotify}
          className=" text-2xl cursor-pointer text-red-600 "
        />
      </div>
    </div>
  );
};
