"use client";
import Link from "next/link";
import React, { useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { FaArrowRight, FaArrowLeft} from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import magicStar from '../../../public/magic_star_.png'
import { Button } from "@/components/ui/button";
import { RiBankLine } from "react-icons/ri";
import { useRouter } from 'next/navigation';

const redeemPoints = () => {

  const { push } = useRouter();
 


  return (
    <>
      <div className="lg:w-5/12 w-12/12 mx-auto pb-10 lg:mt-10 mt-20">
        <h1 className="font-bold text-2xl">Redeem points for cash</h1>
        <p>Where should we send to?</p>
        <form className="space-y-6 mt-8">
        <Link href="/" passHref>
        <div className="p-2 border border-gray-300 rounded-lg flex">
                  <div className="inline-block  rounded-[9px] py-2 px-2 mr-3 bg-[#FFA048]">
                      <img src="/magic_star_.png" alt="" className=" w-8 h-8" />
                    </div>
                  <div>
                    <p className=" font-bold">Beneficiaries</p>
                    <span className=" text-sm font-sm text-gray-400">Send to already saved channels</span>
                  </div>
          </div>
          </Link>
                    <div className="bg-white border shadow-lg lg:p-4 p-3 rounded-[2rem] mb-5">
                            <div className="p-1  rounded-lg flex">
                                <div className="inline-block  rounded-full py-2 px-2 mr-5 bg-[#28B825]">
                                    <RiBankLine className="w-8 h-8 text-white"/>
                                </div>

                                <div>
                                    <p>Jams, Ethan Hunt</p>
                                    <span>2023434318 | Opay</span>
                                </div>
                            </div>
                    </div>
                    <div>
            <span className="text-gray-500">Enter points to redeem</span>
            <div className="relative flex items-center"> 
     
      <Input
        type="text"
        id=""
        name=""
        placeholder=""
        className="p-7 border border-gray-300 text-gray-500"
      />

     
      <span className="absolute left-4 top-0 bottom-0 flex items-center pl-2 text-gray-500">0</span>

      
      <span className="absolute right-4 top-0 bottom-0 flex items-center pr-2 text-[#D98400]">MAX</span>
    </div>
            <div className="flex justify-between">
            <div className="flex items-center text-gray-500">
          </div>
              <p>Balance 550</p>
            </div>
          </div>
          
          <Link href="/dashboard/redeemPages/pin">
            <Button
            // onClick={() => push("/dashboard/redeemPages/pin")}
              className="relative bg-[#F9A21B] hover:bg-[#f3b456] px-4 lg:h-12 lg:text-md mt-4 rounded-md flex items-center w-full">
              
              {/* Text container centered */}
              <span className="w-full text-center block">Redeem Points</span>
              
              {/* Right icon aligned to the right */}
              <FaArrowRight className="text-white absolute right-4" />
            </Button>
            </Link>
          
        </form>
      </div>
      
    </>
  );
};

export default redeemPoints;
