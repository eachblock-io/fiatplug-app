"use client"
import Link from "next/link";
import React, { useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { FaArrowRight,FaCheck } from "react-icons/fa6";


const successScreen = () => {


  return (
    <>

      <FaArrowRight className="text-white" />
      <div className="lg:w-5/12 w-12/12 mx-auto pb-10 lg:mt-10 mt-20">
        {/* <h1 className="font-bold text-2xl text-gray-800">Enter Pin</h1>
        <p className="text-gray-400">Enter your 4 digit pin used to make transaction</p> */}
        <div className="flex -space-x-2 overflow-hidden">
        <img
          className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
          alt=""
        />


        <FaCheck className="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-[#04DF00]"/>


        {/* <img
          className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        /> */}
      </div>
      
      <div>
            <p className="text-gray-400"> Points Redeemed</p>
            <h1 className="font-bold text-2xl text-gray-800">Succesful!!</h1>
            <p className="font-bold text-2xl text-gray-800">You just redeemed 300 Points for NGN75,000 cash, You will be credited within 24hours</p>
      </div>
      
        
      </div>
      
    </>
  );
};

export default successScreen;
