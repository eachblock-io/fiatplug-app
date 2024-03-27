"use client";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import fetchToken from "@/lib/auth";
import ClipLoader from "react-spinners/ClipLoader";
import { Button } from "@/components/ui/button";
import { IoIosArrowRoundForward } from "react-icons/io";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import toast from "react-hot-toast";

const Enterpin = ({ open, setOpen, data }: any) => {
  const cancelButtonRef = useRef(null);
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
        handleSubmitFormData();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitFormData = async () => {
    // e.preventDefault();
    try {
      const token = await fetchToken();
      const headers = {
        Authorization: `Bearer ${token?.data?.token}`,
        "Content-Type": "application/json",
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/mobile/airtime-data-top-up`,
        {
          method: "POST",
          headers,
          body: JSON.stringify(data),
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
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40"
          initialFocus={cancelButtonRef}
          onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end w-full justify-center text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                <Dialog.Panel className="relative transform overflow-hidden rounded-t-[39px] bg-white text-left shadow-xl transition-all sm:my-8 w-screen h-[50vh]">
                  <div className="bg-white py-8 sm:p-6 sm:pb-4 w-full flex items-center justify-center">
                    <div className="mt-2 w-10/12 mx-auto">
                      <div>
                        <h1 className="font-semibold lg:text-3xl text-2xl mb-2">
                          Enter Pin
                        </h1>
                        <p className="text-sm font-normal text-[#6C757D]">
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
                              <IoIosArrowRoundForward className="text-white absolute right-4" />
                            )}
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default Enterpin;
