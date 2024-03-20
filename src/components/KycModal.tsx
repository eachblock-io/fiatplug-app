"use client";
import { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import kycImg from "@/public/kyc.svg";
import Image from "next/image";
import Link from "next/link";
import { IoClose } from "react-icons/io5";

const KycModal = () => {
  const [open, setOpen] = useState(true);

  const cancelButtonRef = useRef(null);

  const [user, setUser] = useState<any>();
  useEffect(() => {
    if (window != undefined) {
      const userData: any = localStorage.getItem("userData");
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user?.attributes?.is_verified === null) {
    return null;
  }

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
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                <Dialog.Panel className="relative transform overflow-hidden rounded-[29px] bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white py-8 sm:p-6 sm:pb-4">
                    <IoClose
                      onClick={() => setOpen(false)}
                      className="absolute cursor-pointer top-4 right-6 text-2xl text-gray-500"
                    />
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-orange-50 sm:mx-0 sm:h-10 sm:w-10">
                        <Image
                          src={kycImg}
                          alt="security"
                          className="lg:w-10 w-10"
                        />
                      </div>
                      <div className="mt-3 w-9/12 mx-auto text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-xl mt-2 font-bold leading-6 text-gray-600">
                          You are almost ready to start trade
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500 mb-6">
                            To start trading, you need to complete Identity
                            verification process
                          </p>
                          <Link href="/dashboard/kyc">
                            <button
                              type="button"
                              className="w-full rounded-lg bg-[#F9A21B] px-10 py-4 text-sm font-semibold text-white shadow-sm hover:bg-orange-300 sm:ml-3 sm:w-auto">
                              Verify Identity
                            </button>
                          </Link>
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

export default KycModal;
