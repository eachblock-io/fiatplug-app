"use client";
import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { IoIosArrowRoundBack } from "react-icons/io";
import Link from "next/link";
import fetchToken from "@/lib/auth";
import toast from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa6";
import Feedback from "@/components/Feedback";

const PinPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [value, setValue] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const token = await fetchToken();
      const headers = {
        Authorization: `Bearer ${token?.data?.token}`,
        "Content-Type": "application/json",
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/mobile/transaction-pin`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({ transaction_pin: value }),
        }
      );

      const resdata = await res.json();
      if (resdata?.status == "error") {
        toast.error(resdata?.message);
      }
      if (resdata?.status == "success") {
        setIsSuccess(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      {isSuccess && <Feedback />}
      <div className="lg:w-5/12 w-10/12 mx-auto pb-10 lg:mt-8 mt-20">
        <div className="mb-20">
          <Link href="/dashboard/account/cash">
            <IoIosArrowRoundBack className="text-4xl" />
          </Link>
        </div>
        <div>
          <h1 className="font-semibold lg:text-3xl text-3xl mb-3">Enter Pin</h1>
          <p className="text-base font-normal text-[#6C757D]">
            Enter your 4 digit pin used to make transaction?
          </p>
        </div>
        <form className="space-y-4 mt-20" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <InputOTP
              maxLength={4}
              value={value}
              onChange={(value) => setValue(value)}>
              <InputOTPGroup className="w-10/12 mx-auto flex justify-between">
                <InputOTPSlot
                  index={0}
                  className="border border-b-gray-400 text-xl border-b-[0.5px] focus:border-b-orange-400 border-t-white border-r-white border-l-white rounded-none"
                />
                <InputOTPSlot
                  index={1}
                  className="border border-b-gray-400 text-xl border-b-[0.5px] focus:border-b-orange-400 border-t-white border-r-white border-l-white rounded-none"
                />
                <InputOTPSlot
                  index={2}
                  className="border border-b-gray-400 text-xl border-b-[0.5px] focus:border-b-orange-400 border-t-white border-r-white border-l-white rounded-none"
                />
                <InputOTPSlot
                  index={3}
                  className="border border-b-gray-400 text-xl border-b-[0.5px] focus:border-b-orange-400 border-t-white border-r-white border-l-white rounded-none"
                />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <div className="mt-6 px-8 pb-8 fixed bottom-0 right-0 left-0 z-10 bg-white">
            <Button className="relative bg-[#F9A21B] hover:bg-[#f3b456] px-4 py-7 lg:text-md mt-4 rounded-full flex items-center w-full">
              <span className="w-full text-center block">
                {isLoading ? "Loading..." : "Continue"}
              </span>
              {!isLoading && (
                <FaArrowRight className="text-white absolute right-4" />
              )}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default PinPage;
