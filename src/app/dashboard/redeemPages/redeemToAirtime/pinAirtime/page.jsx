"use client"
import Link from "next/link";
import React, { useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { OtpInput } from '@/components/OtpInput';

const Pin = () => {

    const [otp, setOtp] = useState(new Array(4).fill(""));

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        //Focus next input
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

  return (
    <>

      <FaArrowRight className="text-white" />
      <div className="lg:w-5/12 w-12/12 mx-auto pb-10 lg:mt-10 mt-20">
        <h1 className="font-bold text-2xl text-gray-800">Enter Pin</h1>
        <p className="text-gray-400">Enter your 4 digit pin used to make transaction</p>

        <form className="space-y-6 mt-8">
        <div className="row">
            <div className="col text-center mb-20">
            {otp.map((data, index) => {
                        return (
                            <input
                            className="otp-field w-12 h-12 text-center text-xl border-b-2 border-gray-300 focus:border-yellow-500 focus:outline-none"
                            type="text"
                            name="otp"
                            maxLength="1"
                            key={index}
                            value={data}
                            onChange={(e) => handleChange(e.target, index)}
                            onFocus={(e) => e.target.select()}
                          />
                          
                        );
                    })}
            </div>
        </div>
        
        <Link href="/dashboard/redeemPages/redeemToAirtime/successScreen">
        
          <Button
            className="relative bg-[#F9A21B] hover:bg-[#f3b456] px-4 lg:h-12 lg:text-md mt-4 rounded-md flex items-center w-full">
            <span className="w-full text-center block">Continue</span>
          </Button>
        </Link>
        </form>
      </div>
      
    </>
  );
};

export default Pin;
