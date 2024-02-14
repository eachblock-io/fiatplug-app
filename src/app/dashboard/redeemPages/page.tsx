import Link from "next/link";
import React from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { FaArrowLeft,FaArrowRight } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import magicStar from '../../../public/magic_star_.png'
import { Button } from "@/components/ui/button";
// import { useRouter } from 'next/router';


const RedeemPointsAirtime = () => {
  // const router = useRouter();
  return (
    <>
      <div className=" ml-5">
              {/* Back button */}
              <FaArrowLeft />
      </div>
      <div className="lg:w-5/12 w-12/12 mx-auto pb-10 lg:mt-10 mt-20">
      
        <h1 className="font-bold text-2xl">Redeem points for cash</h1>
        <p>Where should we send to?</p>
        <form className="space-y-6 mt-8">
        <Link href="/dashboard/redeemPages/chooseAbeneficiary" passHref>
          <div className="p-2 border border-gray-500 rounded-lg flex">
                  <div className="inline-block  rounded-[9px] py-2 px-2 mr-3 bg-[#FFA048]">
                      <img src="/magic_star_.png" alt="" className=" w-8 h-8" />
                    </div>
                  <div>
                    <p className=" font-bold">Beneficiaries</p>
                    <span className=" text-sm font-sm text-gray-400">Send to already saved channels</span>
                  </div>
          </div>
          </Link>
          <div>
            <Input
              type="text"
              id="Bank"
              name="Bank"
              value="Bank"
              required
              placeholder="Bank"
              className="p-7 border border-gray-500 text-gray-500"
            />
          </div>
          <div>
            <Input
              type="text"
              id="accountNumber"
              name="accountNumber"
              value="Account Number"

              required
              placeholder="Account Number"
              className="p-7 border border-gray-500 text-gray-500"
            />
          </div>
          <div>
            <Input
              type="text"
              id="AccountName"
              name="Account Name"
              value="Account Name"

              required
              placeholder="Account Name"
              className="p-7 border border-gray-500 text-gray-500"
            />
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
                 <img src="/Group_34373.png" className="w-3 h-3 mx-1" alt="Conversion icon"/>
              <p className="mb-0">NGN600</p>
          </div>
              <p>Balance 550</p>
            </div>
          </div>

          <Button
            className="relative bg-[#F9A21B] hover:bg-[#f3b456] px-4 lg:h-12 lg:text-md mt-4 rounded-full flex items-center w-full">
            <span className="w-full text-center block">Proceed</span>
            <FaArrowRight className="text-white absolute right-4" />
          </Button>
        </form>
      </div>

    </>
  );
};

export default RedeemPointsAirtime;
