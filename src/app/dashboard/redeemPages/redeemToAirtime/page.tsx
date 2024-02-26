"use client"
import Link from "next/link";
import React from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { FaArrowLeft,FaArrowRight } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import magicStar from '../../../public/magic_star_.png'
import { Button } from "@/components/ui/button";
import  PhoneInput  from "@/components/phoneNumber";
import  SelectNetwork  from "@/components/SelectNetwork";
import { useRouter } from 'next/navigation';
import GroupImg from "@/public/Group_34373.png";
import Image from "next/image";


const RedeemToAirtime = () => {
  const { push } = useRouter();
  return (
    <>
      <div className=" ml-5">
              {/* Back button */}
              <FaArrowLeft />
      </div>
      <div className="lg:w-5/12 w-12/12 mx-auto pb-10 lg:mt-10 mt-20">
      
        <h1 className="font-bold text-2xl">Airtime</h1>
        <p>Select a network provider</p>
        <form className="space-y-6 mt-8">
        <SelectNetwork/>
          <div>
          <span className="text-gray-500 ">Enter Phone Number</span>
            <div className="mt-10">
                    <PhoneInput
                    type="numeric"
                    className="p-7 border border-gray-300 text-gray-500"
                    />
                </div>
          </div>
          <div>
            <span className="text-gray-500">Enter points to redeem</span>
            <div className="relative flex items-center"> 
     
      <Input
        type="text"
        id=""
        name=""
        required
        placeholder=""
        className="p-7 border border-gray-500 text-gray-500"
      />

     
      <span className="absolute left-4 top-0 bottom-0 flex items-center pl-2 text-gray-500">0</span>

      
      <span className="absolute right-4 top-0 bottom-0 flex items-center pr-2 text-[#D98400]">MAX</span>
    </div>
            <div className="flex justify-between">
            <div className="flex items-center text-gray-500">
              <p className="mb-0">1 Point =</p>
              <Image src={GroupImg} alt="magic_star_.png" className=" w-8 h-8"/>
                
              <p className="mb-0">NGN600</p>
          </div>
              <p>Balance 550</p>
            </div>
          </div>


          {/* <Link href="/dashboard/redeemPages/redeemToAirtime/pinAirtime"> */}
              <Button
              onClick={() => push("/dashboard/redeemPages/redeemToAirtime/pinAirtime")}
                className="relative bg-[#F9A21B] hover:bg-[#f3b456] px-4 lg:h-12 lg:text-md mt-4 rounded-full flex items-center w-full">
                <span className="w-full text-center block">Proceed</span>
                <FaArrowRight className="text-white absolute right-4" />
              </Button>
          {/* </Link> */}
        </form>
      </div>

    </>
  );
};

export default RedeemToAirtime;
