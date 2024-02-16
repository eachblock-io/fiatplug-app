"use client"
import Link from "next/link";
import React, { useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { FaArrowRight,FaCheck } from "react-icons/fa6";
import { BiSolidBank } from "react-icons/bi"
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

const successScreen = () => {

  const { push } = useRouter();

  return (
    <>

      <FaArrowRight className="text-white" />
      <div className="lg:w-5/12 w-12/12 mx-auto pb-10 lg:mt-10 mt-20">
        <div className="flex justify-center items-center mb-5">
        <div className="flex -space-x-2 overflow-hidden">
          <div className="flex justify-center items-center h-14 w-14 rounded-full ring-2 ring-white bg-[#D9D9D9]">
            <BiSolidBank className="text-white h-6 w-6"/>
          </div>

          <div className="flex justify-center items-center h-14 w-14 rounded-full ring-2 ring-white bg-[#04DF00]">
            <FaCheck className="text-white h-6 w-6"/>
          </div>
        </div>

        </div>

      
        <div className="text-center mb-10">
              <p className="text-[#6B4201] mb-6"> Points Redeemed</p>
              <h1 className="font-bold text-2xl text-gray-800">Succesful!!</h1>
                <p className="text-lg text-gray-500">
                  You just redeemed 300 Points for
                  <img src="/Group_34373.png" className="w-3 h-3 mr-1 inline" alt="Conversion icon"/>
                  NGN75,000 airtime
              </p>

        </div>

        <div className="col-span-1 divide-y divide-gray-200  p-2 lg:p-4 rounded-lg bg-white shadow-2xl text-center">
              <div className="flex w-full items-center justify-between space-x-2 lg:space-x-6 p-4 lg:p-6">
                <div className="flex-1 text-center">
                  <div className="space-x-0 lg:space-x-3 text-center">
                    <h3 className="text-xs lg:text-sm font-bold text-black text-center">Rate your experience.</h3>
                  </div>
                  <p className="mt-1 text-xs lg:text-sm text-gray-500 text-center">Hi there! We’d love to know if you had a great experience.</p>
                </div>
              </div>

              <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                  <div className="flex w-0 flex-1 justify-center items-center">
                    <a
                      className="relative flex flex-col items-center justify-center w-full py-2 lg:py-4 text-xs lg:text-sm font-semibold text-[#007AFF] rounded-br-lg border border-transparent"
                      href="#"
                    >
                      <span className="text-lg">😟</span>
                      <span>Not Good</span>
                    </a>
                  </div>
                  <div className="-ml-px flex w-0 flex-1 justify-center items-center">
                    <a
                      className="relative flex flex-col items-center justify-center w-full py-2 lg:py-4 text-xs lg:text-sm font-semibold text-[#007AFF] rounded-br-lg border border-transparent"
                      href="#"
                    >
                      <span className="text-lg">😊</span>
                      <span>Great!</span>
                    </a>
                  </div>
                </div>
              </div>
        </div>
        
        <Button
          onClick={() => push("/dashboard")}
          className="relative bg-[#F9A21B] hover:bg-[#f3b456] px-4 lg:h-12 lg:text-md mt-4 rounded-full flex items-center w-full">
          <span className="w-full text-center block">Back to home</span>
        </Button>

      </div>
      
    </>
  );
};

export default successScreen;
