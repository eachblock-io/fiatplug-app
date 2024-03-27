"use client";
import React from "react";
import { Button } from "./ui/button";
import reviImg from "@/public/chat.png";
import Image from "next/image";
import Link from "next/link";

const ReviewSuccessModal = ({ openSuccessModal, setSuccessModal }: any) => {
  return (
    <>
      {openSuccessModal ? (
        <div className="flex items-center justify-center absolute top-0 bottom-0 right-0 left-0 h-screen w-full z-10 bg-black bg-opacity-75 lg:py-4 pb-10 lg:px-20 px-6">
          <div className="bg-white w-12/12 lg:w-[30%] xl:w-[40%] 2xl:w-[30%] rounded-[1rem] relative px-3 lg:px-7 py-4 lg:py-6">
            <section className="py-6 px-6">
              <Image
                src={reviImg}
                alt="reviewImg"
                width={100}
                height={100}
                layout="fixed"
                className="mx-auto"
              />
              <div className="text-center">
                <h2 className="font-semibold lg:font-bold text-xl text-black my-10">
                  Thank you for sharing!
                </h2>
                <p className="text-base font-normal text-[#444444]">
                  Your feedback helps others make better decisions about which
                  traders to use.
                </p>
              </div>
              <Link href="/dashboard" className="mt-10">
                <Button className="relative bg-[#F9A21B] hover:bg-[#f3b456] rounded-full px-4 h-14 lg:text-md mt-8 flex items-center w-full">
                  <span className="w-full text-center block">Back to home</span>
                </Button>
              </Link>
            </section>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ReviewSuccessModal;
