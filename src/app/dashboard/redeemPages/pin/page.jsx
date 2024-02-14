import Link from "next/link";
import React from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


const pin = () => {
  return (
    <>

      <FaArrowRight className="text-white" />
      <div className="lg:w-5/12 w-12/12 mx-auto pb-10 lg:mt-10 mt-20">
        <h1 className="font-bold text-2xl">Enter Pin</h1>
        <p>Enter your 4 digit pin used to make transaction</p>
        <form className="space-y-6 mt-8">
        
          <Button
            className="relative bg-[#F9A21B] hover:bg-[#f3b456] px-4 lg:h-12 lg:text-md mt-4 rounded-full flex items-center w-full">
            <span className="w-full text-center block">Continue</span>
          </Button>
        </form>
      </div>
      
    </>
  );
};

export default pin;
