import Link from "next/link";
import React from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import magicStar from '../../../public/magic_star_.png'
import { Button } from "@/components/ui/button";

const RedeemPointsAirtime = () => {
  return (
    <>

      <FaArrowRight className="text-white" />
      <div className="lg:w-5/12 w-12/12 mx-auto pb-10 lg:mt-10 mt-20">
        <h1 className="font-bold text-2xl">Redeem points for cash</h1>
        <p>Where should we send to?</p>
        <form className="space-y-6 mt-8">
        <Link href="/dashboard/redeemPages/chooseAbeneficiary" passHref>
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
          <div>
            <Input
              type="text"
              id="accountName"
              name="accountName"
              value="accountName"
              required
              placeholder="Account Name"
              className="p-7 border border-gray-500"
            />
          </div>
          <div>
            <Input
              type="text"
              id="accountNumber"
              name="accountNumber"
              value="bank"

              required
              placeholder="Account Number"
              className="p-7 border border-gray-500"
            />
          </div>
          <div>
            <Input
              type="text"
              id="accountNumber"
              name="account Number"
              value="bank"

              required
              placeholder="Account Number"
              className="p-7 border border-gray-500"
            />
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
                 {/* <p>1 Points = <img src="/Group_34373.png"/>NGN600</p> */}
                 <p>1 Points = NGN600</p>
              </div>
              <p>Balance 550</p>
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

    </>
  );
};

export default RedeemPointsAirtime;
