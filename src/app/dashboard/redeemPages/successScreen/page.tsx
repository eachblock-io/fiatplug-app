"use client"
import Link from "next/link";
import React, { useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { FaArrowRight,FaCheck } from "react-icons/fa6";
import { CiBank } from "react-icons/ci";


const successScreen = () => {


  return (
    <>

      <FaArrowRight className="text-white" />
      <div className="lg:w-5/12 w-12/12 mx-auto pb-10 lg:mt-10 mt-20">
        <div className="flex justify-center items-center mb-5">
              <div className="flex -space-x-2 overflow-hidden">

                <div className="text-center inline-block h-10 w-10 p-8 rounded-full ring-2 ring-white bg-[#D9D9D9]">
                    <CiBank className="text-black"/>
                </div>

                <div className="text-center inline-block h-10 w-10 p-8 rounded-full ring-2 ring-white bg-[#04DF00] ">
                    <FaCheck className=" text-lg"/>
                </div>
                  
                  
              </div>
        </div>

      
        <div className="text-center mb-10">
              <p className="text-[#6B4201] mb-6"> Points Redeemed</p>
              <h1 className="font-bold text-2xl text-gray-800">Succesful!!</h1>
              <p className="text-xl text-gray-500">You just redeemed 300 Points for NGN75,000 cash, You will be credited within 24hours</p>
        </div>

          <div className="col-span-1 divide-y divide-gray-200 lg:p-4 p-3 rounded-lg bg-white shadow-lg text-center">
          <div className="flex w-full items-center justify-between space-x-6 p-6">
            <div className="flex-1  text-center">
              <div className=" space-x-3 text-center">
                <h3 className="text-sm font-bold text-black text-center">Rate your experience. </h3>
              </div>
              <p className="mt-1  text-sm text-gray-500 text-center">Hi there! We’d love to know if you had a great experience.</p>
            </div>
           
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1 text-center">

                <span>😟</span>

                <a
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-[#007AFF]"
                >
                  Not Good
                </a>
              </div>
              <div className="-ml-px flex w-0 flex-1">
                <span>😊</span>

                <a
                  className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-[#007AFF]"
                >
                  Great
                </a>
              </div>
            </div>
          </div>
        </div>


      </div>
      
    </>
  );
};

export default successScreen;
