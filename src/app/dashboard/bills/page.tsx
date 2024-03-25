import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import Link from "next/link";
import Mobilenav from "@/components/Mobilenav";
import Image from "next/image";
import billImg from "@/public/billpayment.png";

const BillsPage = () => {
  return (
    <section className="h-screen w-10/12 mx-auto relative mt-10">
      <div className="text-center">
        <Link href="/dashboard" className="text-2xl">
          <IoIosArrowRoundBack className="absolute left-0 top-0 text-4xl" />
        </Link>
        <h1 className="font-semibold text-center lg:text-2xl text-xl">
          Pay Utility
        </h1>
      </div>
      <div className="flex items-center justify-center mt-20">
        <div className="bg-[#FFFDF9] shadow rounded-lg w-7/12 h-40 flex items-center justify-center">
          <div className="text-center">
            <Image
              src={billImg}
              alt="electric-bill"
              width="100"
              height="100"
              layout="fixed"
            />
            <p className="text-xs">Electricity</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BillsPage;
