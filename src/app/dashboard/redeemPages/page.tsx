"use client"
import Link from "next/link";
import React, { useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import magicStar from '../../../public/magic_star_.png'
import { Button } from "@/components/ui/button";
import Image from "next/image";
import LabelInput from "@/components/forms/LabelInput";

const RedeemPointsAirtime = () => {
 
  return (
    <section>
      {/* <FaArrowRight className="text-white" /> */}
      <div className="lg:w-5/12 w-12/12 mx-auto pb-10 lg:mt-10 mt-20">
        <div>
          <h1 className="text-lg font-semibold md:font-bold md:text-2xl">Redeem points for cash</h1>
          <p className="text-base font-normal text-[#6C757D]">Where should we send to?</p>
        </div>
        <form className="space-y-6 mt-9">
          <Link href="/dashboard/redeemPages/chooseAbeneficiary" passHref>
            <div className="flex gap-[10px] items-center px-[10px] py-[8px] border-[0.7px] border-solid border-[#00000033] rounded-[10px]">
              <div className="flex justify-center items-center rounded-[9px] py-3 px-3 bg-[#FFA04878]">
                <Image src="/magic_star_.png" alt="star" className="" width={21} height={22} />
              </div>
              <div>
                <p className="text-base font-semibold text-black">Beneficiaries</p>
                <span className="text-xs font-medium text-[#1B1D21] tracking-[-0.2px]">Send to already saved channels</span>
              </div>
            </div>
          </Link>
          
          <LabelInput type="text" label="Bank" name="bank" />
          <LabelInput type="text" label="Account Number" name="accountNumber" />
          <LabelInput type="text" label="Account name" name="accountName" />
          
          <div>
            <label htmlFor="points" className="block text-sm font-medium text-[#6C757D] mb-[10px]">Enter points to redeem</label>
            <div className="relative"> 
              <input
                type="number"
                id="points"
                required
                placeholder="0"
                className="py-2 w-full pl-3 border-[0.7px] border-solid border-[#000000] rounded-[10px] h-[66px] outline-none focus:outline-none text-xs font-normal text-[#1b1d21cc] placeholder:text-xs placeholder:font-medium placeholder:text-[#1B1D21]"
              />
              <span className="absolute right-4 top-0 bottom-0 flex items-center pr-2 text-sm font-medium text-[#D98400]">MAX</span>
            </div>
            <div className="flex justify-between mt-2">
              <div>
                  {/* <p>1 Points = <img src="/Group_34373.png"/>NGN600</p> */}
                  <p className="text-sm font-normal text-[#6C757D]">1 Points = NGN600</p>
              </div>
              <p className="text-sm font-normal text-[#6C757D]">Balance 550</p>
            </div>
          </div>

          <Button
            className="relative bg-[#F9A21B] hover:bg-[#f3b456] px-4 lg:h-12 lg:text-md mt-4 rounded-full flex items-center w-full">
            {/* Text container centered */}
            <span className="w-full text-center block">Proceed</span>
            {/* Right icon aligned to the right */}
            <FaArrowRight className="text-white absolute right-4" />
          </Button>
        </form>
      </div>
    </section>
  );
};

export default RedeemPointsAirtime;
