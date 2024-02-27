"use client"
import React from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { Button } from "./ui/button";

const EnterPin = ({ openModal, setModal, handleSuccessModal }: any) => {
  return (
    <>
      {openModal ? (
        <div className="flex items-center justify-center absolute top-0 bottom-0 right-0 left-0 h-screen w-full z-10 bg-black bg-opacity-75 lg:py-4 pb-10 lg:px-20 px-6">
          <div className="bg-white lg:w-[40%] w-12/12 rounded-[1rem] relative px-3 lg:px-7 py-4 lg:py-6">
            <IoCloseCircleSharp
              onClick={() => setModal(false)}
              className="absolute top-6 right-4 text-2xl text-black"
            />
            <div className="">
              <h2 className="font-bold text-xl lg:text-3xl text-[#4E4C4C]">Enter Pin</h2>
              <p className="text-xs lg:text-sm font-normal text-[#9F9F9F] mt-2">
                Enter your 4 digit pin used to make transaction
              </p>
            </div>
            <form action="" className="mt-12">
              <div className="flex items-center justify-center gap-[22px] mb-24">
                <input type="number" min="0" max="9" step="1" className="w-[37px] p-1 border-b-2 border-solid focus:border-[#F9A21B] border-[#C2C2C2] text-3xl font-normal text-black focus:outline-none" />
                <input type="number" maxLength={1 as number} pattern="[0-9]" className="w-[37px] p-1 border-b-2 border-solid focus:border-[#F9A21B] border-[#C2C2C2] text-3xl font-normal text-black focus:outline-none" />
                <input type="number" className="w-[37px] p-1 border-b-2 border-solid focus:border-[#F9A21B] border-[#C2C2C2] text-3xl font-normal text-black focus:outline-none" />
                <input type="number" className="w-[37px] p-1 border-b-2 border-solid focus:border-[#F9A21B] border-[#C2C2C2] text-3xl font-normal text-black focus:outline-none" />
              </div>
              <Button onClick={handleSuccessModal} className="relative bg-[#F9A21B] hover:bg-[#f3b456] px-4 lg:h-12 lg:text-md mt-8 flex items-center w-full">
                <span className="w-full text-center block">Continue</span>
                {/* <FaArrowRight className="text-white absolute right-4" /> */}
              </Button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default EnterPin;
