"use client";
import { useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { Button } from "./ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

const EnterPin = ({ openModal, setModal, handleSubmitPin }: any) => {
  const [value, setValue] = useState("");

  return (
    <>
      {openModal ? (
        <div className="flex items-center justify-center absolute top-0 bottom-0 right-0 left-0 h-screen w-full  bg-black bg-opacity-75 lg:py-4 pb-10 lg:px-20 px-6 z-20">
          <div className="bg-white lg:w-[40%] w-12/12 rounded-[1rem] relative px-3 lg:px-7 py-4 lg:py-6">
            <IoCloseCircleSharp
              onClick={() => setModal(false)}
              className="absolute top-6 right-4 text-2xl text-black"
            />
            <div className="">
              <h2 className="font-bold text-xl lg:text-3xl text-[#4E4C4C]">
                Enter Pin
              </h2>
              <p className="text-xs lg:text-sm font-normal text-[#9F9F9F] mt-2">
                Enter your 4 digit pin used to make transaction
              </p>
            </div>
            <form action="" className="mt-12" onSubmit={handleSubmitPin}>
              <InputOTP
                maxLength={6}
                value={value}
                className="w-full mx-auto"
                onChange={(value) => setValue(value)}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                <InputOTPGroup className="w-10/12 mx-auto flex justify-between outline-none">
                  <InputOTPSlot index={0} className=" outline-none border-b" />
                  <InputOTPSlot
                    index={1}
                    className=" ring-1 border border-b-gray-500 focus:border-b-orange-400 border-t-white border-r-white border-l-white "
                  />
                  <InputOTPSlot index={2} className=" border-b " />
                  <InputOTPSlot index={3} className=" border-b " />
                </InputOTPGroup>
              </InputOTP>
              <Button className="relative bg-[#F9A21B] hover:bg-[#f3b456] px-4 lg:h-12 lg:text-md mt-8 flex items-center w-full">
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
