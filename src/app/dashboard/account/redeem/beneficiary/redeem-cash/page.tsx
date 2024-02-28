"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { RiBankLine } from "react-icons/ri";
import Image from "next/image";
import EnterPin from "@/components/EnterPin";
import Success from "@/components/Success";

const RedeemCash = () => {
  const [openModal, setModal] = useState<boolean>(false);
  const [openSuccessModal, setSuccessModal] = useState<boolean>(false);

  const handleModal = () => {
    setModal(true);
  };
  const handleSuccessModal = () => {
    setModal(false);
    setSuccessModal(true);
  };
  return (
    <>
      <FaArrowRight className="text-white" />
      <div className="lg:w-5/12 w-12/12 mx-auto pb-10 lg:mt-10 mt-20">
        <div>
          <h1 className="text-lg font-semibold md:font-bold md:text-2xl">
            Redeem points for cash
          </h1>
          <p className="text-base font-normal text-[#6C757D]">
            Where should we send to?
          </p>
        </div>

        {/* <Link href="/dashboard/account/redeem/beneficiary" passHref>
            <div className="flex gap-[10px] items-center px-[10px] py-[8px] border-[0.7px] border-solid border-[#00000033] rounded-[10px]">
              <div className="flex justify-center items-center rounded-[9px] py-3 px-3 bg-[#FFA04878]">
                <Image
                  src="/magic_star_.png"
                  alt="star"
                  className=""
                  width={21}
                  height={22}
                />
              </div>
              <div>
                <p className="text-base font-semibold text-black">
                  Beneficiaries
                </p>
                <span className="text-xs font-medium text-[#1B1D21] tracking-[-0.2px]">
                  Send to already saved channels
                </span>
              </div>
            </div>
          </Link> */}

        {/* <Link href="#" className="block mt-3">
            <div className="bg-white shadow-bank-details lg:p-8 p-6 rounded-[2rem] mb-5">
              <div className="p-2  rounded-lg flex gap-[15px] items-center">
                <div className="flex justify-center items-center rounded-full h-[34px] w-[34px] bg-[#28B825]">
                  <RiBankLine className=" text-white w-[19px] h-[17px]" />
                </div>

                <div>
                  <p className="text-sm font-medium text-black">
                    Jams, Ethan Hunt
                  </p>
                  <span className="text-xs font-normal text-[#00000099]">
                    2023434318 | Opay
                  </span>
                </div>
              </div>
            </div>
          </Link> */}
        <form className="space-y-6 mt-8">
          <div>
            <label
              htmlFor="points"
              className="block text-sm font-medium text-[#6C757D] mb-[10px]">
              Enter points to redeem
            </label>
            <div className="relative">
              <input
                type="number"
                id="points"
                required
                placeholder="0"
                className="py-2 w-full pl-3 border-[0.7px] border-solid border-[#000000] rounded-[10px] h-[66px] outline-none focus:outline-none text-xs font-normal text-[#1b1d21cc] placeholder:text-xs placeholder:font-medium placeholder:text-[#1B1D21]"
              />
              <span className="absolute right-4 top-0 bottom-0 flex items-center pr-2 text-sm font-medium text-[#D98400]">
                MAX
              </span>
            </div>
            <div className="flex justify-end mt-2">
              <p className="text-sm font-normal text-[#6C757D]">Balance 550</p>
            </div>
          </div>

          <Button
            onClick={handleModal}
            className="relative bg-[#F9A21B] hover:bg-[#f3b456] px-4 lg:h-12 lg:text-md mt-8 rounded-full flex items-center w-full">
            {/* Text container centered */}
            <span className="w-full text-center block">Redeem Points</span>

            {/* Right icon aligned to the right */}
            <FaArrowRight className="text-white absolute right-4" />
          </Button>
        </form>
        <EnterPin
          openModal={openModal}
          setModal={setModal}
          handleSuccessModal={handleSuccessModal}
        />
        <Success
          openSuccessModal={openSuccessModal}
          setSuccessModal={setSuccessModal}
        />
      </div>
    </>
  );
};

export default RedeemCash;
