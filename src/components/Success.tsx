"use client"
import React from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { Button } from "./ui/button";
import { RiBankLine } from "react-icons/ri";
import { FaCheck } from "react-icons/fa6";

const Success = ({ openSuccessModal, setSuccessModal }: any) => {
  return (
    <>
      {openSuccessModal ? (
        <div className="flex items-center justify-center absolute top-0 bottom-0 right-0 left-0 h-screen w-full z-10 bg-black bg-opacity-75 lg:py-4 pb-10 lg:px-20 px-6">
          <div className="bg-white w-12/12 lg:w-[30%] xl:w-[40%] 2xl:w-[30%] rounded-[1rem] relative px-3 lg:px-7 py-4 lg:py-6">
            <IoCloseCircleSharp
              onClick={() => setSuccessModal(false)}
              className="absolute top-6 right-4 text-2xl text-black cursor-pointer"
            />
            <section className="pt-6">
              <div className="flex justify-center items-center">
                <div className="flex justify-center items-center rounded-full h-10 w-10 bg-[#D9D9D9]">
                  <RiBankLine className=" text-white w-[19px] h-[17px]" />
                </div>
                <div className="flex justify-center items-center rounded-full h-12 w-12 bg-white -ml-3">
                  <div className="flex justify-center items-center rounded-full h-10 w-10 bg-[#28B825]">
                    <FaCheck className="text-white" />
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h2 className="font-normal text-sm text-[#6B4201] mt-6 ">Points redeemed</h2>
                <h2 className="font-semibold lg:font-bold text-2xl text-black mt-[10px]">Succesful!!</h2>
                <p className="text-base font-normal text-[#444444] mt-2">
                  You just redeemed 300 Points for NGN75,000 cash, You will be credited within 24hours
                </p>
              </div>
              <div className="mt-16 bg-white shadow-success rounded-[14px] pt-5 px-4">
                <div className="text-center pb-4">
                  <p className="text-base font-semibold text-black tracking-[-0.41px]">Rate your experience.</p>
                  <p className="text-base font-medium text-black tracking-[-0.24px]">Hi there! We’d love to know if you had a great experience. </p>
                </div>
                <div className="flex justify-between border-t border-gray-200">
                  <div className="flex flex-col items-center justify-center gap-4 flex-1 pt-5 pb-6">
                    {/* <Image src={"#"} alt="sad face" /> */}
                    <p className="h-8 w-8">🙁</p>
                    <p className="text-lg font-semibold text-[#007AFF] tracking-[-0.41px]">Not Good</p>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-4 border-l border-gray-200 flex-1 pt-5 pb-6">
                    {/* <Image src={"#"} alt="happy face" /> */}
                    <p className="h-8 w-8">🤗</p>
                    <p className="text-lg font-semibold text-[#007AFF] tracking-[-0.41px]">Great</p>
                  </div>
                </div>
              </div>
              <form action="" className="mt-32">
                <Button className="relative bg-[#F9A21B] hover:bg-[#f3b456] rounded-full px-4 lg:h-12 lg:text-md mt-8 flex items-center w-full">
                  <span className="w-full text-center block">Back to Home</span>
                </Button>
              </form>
            </section>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Success;
