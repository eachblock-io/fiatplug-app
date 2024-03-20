"use client";
import { useState, useEffect } from "react";
import kycImg from "@/public/kyc.svg";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";

const KYCCard = () => {
  const [user, setUser] = useState<any>();
  useEffect(() => {
    if (window != undefined) {
      const userData: any = localStorage.getItem("userData");
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user?.attributes?.is_verified === null) {
    return null;
  }

  return (
    <div>
      <Link
        href="/dashboard/kyc"
        className="bg-white lg:w-10/12 w-12/12 mx-auto border lg:px-8 px-6 py-3 mt-4 lg:py-4 flex gap-x-4 items-center justify-between rounded-xl mb-4 ">
        <div className="flex items-center lg:gap-x-6 gap-x-4">
          <Image src={kycImg} alt="security" className="lg:w-10 w-5" />
          <p className="lg:text-base text-xs">
            Complete verification process to continue trade
          </p>
        </div>
        <div>
          <div className="flex items-center justify-center bg-[#F9A21B] lg:h-8 lg:w-8 h-6 w-6 rounded-full ">
            <IoIosArrowForward className="text-white" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default KYCCard;
