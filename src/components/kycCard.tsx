import React from "react";
import kycImg from "@/public/kyc.svg";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";

const kycCard = () => {
  return (
    <div className="bg-white shadow-lg p-8 flex items-center justify-between rounded-[2rem] my-8 ">
      <Image src={kycImg} alt="security" />
      <p>Complete verification process to continue trade</p>
      <div className="flex items-center justify-center bg-[#F9A21B] h-6 w-6 rounded-full ">
        <IoIosArrowForward className="text-white" />
      </div>
    </div>
  );
};

export default kycCard;
