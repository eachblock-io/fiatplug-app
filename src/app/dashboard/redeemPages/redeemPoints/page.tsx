import Link from "next/link";
import React from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import magicStar from '../../../public/magic_star_.png'
import { Button } from "@/components/ui/button";
import { RiBankLine } from "react-icons/ri";

const redeemPoints = () => {
  return (
    <>

      <FaArrowRight className="text-white" />
      <div className="lg:w-5/12 w-12/12 mx-auto pb-10 lg:mt-10 mt-20">
        <h1 className="font-bold text-2xl">Redeem points for cash</h1>
        <p>Where should we send to?</p>
        <form className="space-y-6 mt-8">
        <Link href="/" passHref>
          <div className="p-2 border border-gray-500 rounded-lg flex">

                  <div className="inline-block  rounded-[9px] py-5 px-5 bg-[#FFA048]">
                      <img src="/magic_star_.png" alt="" className=" w-8 h-8" />
                    </div>
                  <div>
                    <p>Beneficiaries</p>
                    <span>Send to already saved channels</span>
                  </div>
          </div>
          </Link>

         
                    <div className="bg-white border shadow-lg lg:p-8 p-6 rounded-[2rem] mb-5">
                            <div className="p-2  rounded-lg flex">

                                <div className="inline-block  rounded-full py-5 px-5 mr-5 bg-[#28B825]">
                                    <RiBankLine className=" text-white"/>
                                </div>

                                <div>
                                    <p>Jams, Ethan Hunt</p>
                                    <span>2023434318 | Opay</span>
                                </div>
                            </div>
                    </div>
              
       
          <div>
            <span>Enter points to redeem</span>
            <div className="relative flex items-center"> 
     
      <Input
        type="text"
        id="accountName"
        name="accountName"
        required
        placeholder="Account Number"
        className="pl-16 pr-16 py-2 border border-gray-500 w-full" 
      />
      <span className="absolute left-4 top-0 bottom-0 flex items-center pl-2">0</span>
      <span className="absolute right-4 top-0 bottom-0 flex items-center pr-2">MAX</span>
    </div>
            <div className="flex justify-between">
              <div>
              </div>
              <p>Balance 550</p>
            </div>
          </div>
          <Button
                    className="bg-[#F9A21B] hover:bg-[#f3b456] px-4 lg:h-12 lg:text-md mt-4 rounded-full flex justify-between items-center w-full">
                    <span>Redeem Points</span>
                    <FaArrowRight className="text-white" />
        </Button>
        </form>
      </div>
      
    </>
  );
};

export default redeemPoints;
