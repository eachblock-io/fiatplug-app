"use client";
import AccountCard from "@/components/AccountCard";
import kycImg from "@/public/kyc.svg";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import { RiBankLine } from "react-icons/ri";


const chooseAbeneficiary = () => {

  return (
    <section className=" lg:w-11/12 w-11/12 mx-auto mt-6">
      <div className="lg:w-8/12 w-11/12 mx-auto">
        {/* <h1 className="font-bold lg:text-2xl">Account</h1> */}
        <Link
          href="/"
          className="bg-white border shadow-lg lg:p-8 p-2 flex gap-x-4 items-center justify-between rounded-[2rem] my-8 ">
          <div className="flex items-center lg:gap-x-6 gap-x-4">
            <p className="lg:text-lg text-sm">
              Start typing to filter.....
            </p>
          </div>
        </Link>

            <Link href="/dashboard/redeemPages/redeemPoints/" >
                    <div className="bg-white border shadow-lg lg:p-8 p-6 rounded-[2rem] mb-5">
                            <div className="p-2  rounded-lg flex">

                                <div className="inline-block  rounded-full py-5 px-5 bg-[#28B825]">
                                    <RiBankLine className=" text-white"/>
                                </div>

                                <div>
                                    <p>Jams, Ethan Hunt</p>
                                    <span>2023434318 | Opay</span>
                                </div>
                            </div>
                    </div>
                </Link>
        
        <div className="bg-white border shadow-lg lg:p-8 p-6 rounded-[2rem]">
                <div className="p-2  rounded-lg flex">

                     <div className="inline-block rounded-full py-5 px-5 bg-[#28B825]">
                            <RiBankLine className=" text-white"/>
                        </div>

                    <div>
                        <p>Jams, Ethan Hunt</p>
                        <span>2023434318 | Opay</span>
                      </div>
                 </div>
        </div>
      </div>
    </section>
  );
};

export default chooseAbeneficiary;
