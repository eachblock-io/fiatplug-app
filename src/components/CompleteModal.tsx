"use client";
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import img1 from "@/public/undraw_season_change_f99v 1.png";

export default function CompleteModal({
  data,
  handleStartChat,
  completeModal,
  setCompleteModal,
}: any) {
  const cancelButtonRef = useRef(null);

  return (
    <>
      <Transition.Root show={completeModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setCompleteModal}>
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
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="shadow-2xl rounded-lg text-center bg-white lg:p-14 p-8">
                    <Image
                      src={img1}
                      alt="chat"
                      width={200}
                      height={300}
                      layout="fixed"
                      className="mx-auto"
                    />
                    <p className="py-6 lg:px-8 text-sm">
                      Your {data?.currency} purchase is in progress with a
                      10-minute confirmation time. Reach out to our support team
                      for assistance
                    </p>
                    <Button
                      onClick={handleStartChat}
                      className="w-full py-7 rounded-full bg-[#F9A21B] hover:bg-[#ffb151] flex items-center px-6">
                      Chat with merchant
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
