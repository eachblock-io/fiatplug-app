"use client";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import fetchToken from "@/lib/auth";
import ClipLoader from "react-spinners/ClipLoader";
import { LuShieldCheck } from "react-icons/lu";
import coinIcon from "@/public/coin.png";
import Image from "next/image";

const Preview = ({ open, setOpen, data }: any) => {
  const cancelButtonRef = useRef(null);
  console.log(data);
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
                    <div className="text-center mt-2 w-10/12 mx-auto">
                      <div className="flex mx-auto items-center justify-center space-x-4 text">
                        <Image
                          src={coinIcon}
                          alt="coin image"
                          width={20}
                          height={20}
                          layout="fixed"
                        />
                        <h1 className="font-bold text-3xl">200.00</h1>
                      </div>
                      <p className="text-xs mt-2">Available balance</p>

                      <div className="mt-8 w-full space-y-6">
                        <div className="flex items-center justify-between">
                          <p>Amount</p>
                          <p className="font-semibold">1000</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p>Network name</p>
                          <p className="font-semibold">MTN</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p>Data Plan</p>
                          <p className="font-semibold">MTN</p>
                        </div>
                      </div>
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

export default Preview;
