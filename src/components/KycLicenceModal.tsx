"use client";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { Input } from "./ui/input";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Button } from "./ui/button";
import fetchToken from "@/lib/auth";
import ClipLoader from "react-spinners/ClipLoader";
import { LuShieldCheck } from "react-icons/lu";

const KycLicenceModal = ({ openL, setOpenL, formData }: any) => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [isverified, setIsverified] = useState(false);
  const cancelButtonRef = useRef(null);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formdata = {
        kyc_type: formData?.passport,
        license_number: data,
      };
      const token = await fetchToken();
      const headers = {
        Authorization: `Bearer ${token?.data?.token}`,
        "Content-Type": "application/json",
      };
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mobile/kyc`, {
        method: "POST",
        headers,
        body: JSON.stringify(formdata),
      });

      const resdata = await res.json();
      if (resdata?.status == "success") {
        setLoading(false);
        setIsverified(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Transition.Root show={openL} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40"
          initialFocus={cancelButtonRef}
          onClose={setOpenL}>
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
                  <div className="bg-white py-8 sm:p-6 sm:pb-4 w-full">
                    {isverified ? (
                      <div className="mx-auto w-8/12 mt-20 text-center space-y-6">
                        <div className="mx-auto flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-green-50 sm:mx-0 sm:h-10 sm:w-10">
                          <LuShieldCheck className="text-6xl w-20 text-green-600" />
                        </div>
                        <h1 className="font-bold mb-6 text-green-600">
                          Account Verifed
                        </h1>
                        <div className="mt-8">
                          <Link href="/dashboard">
                            <button
                              type="button"
                              className="w-full rounded-lg bg-[#F9A21B] px-10 py-4 text-sm font-semibold text-white shadow-sm hover:bg-orange-300 sm:ml-3 sm:w-auto">
                              Start trading
                            </button>
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className="sm:flex sm:items-start w-9/12 mx-auto">
                        <IoIosArrowRoundBack
                          onClick={() => setOpenL(false)}
                          className="text-4xl"
                        />
                        <div className="header relative mt-2 mb-4">
                          <h1 className="lg:text-2xl text-xl font-semibold mb-1 mt-4">
                            Add Drivers License number
                          </h1>
                          <p className="text-xs text-gray-600">
                            Please note that Drivers License Verification must
                            be completed by the owner of the account
                          </p>
                        </div>
                        <div className="mt-8 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <form onSubmit={handleSubmit}>
                            <Input
                              type="text"
                              required
                              name="license_number"
                              value={data}
                              onChange={(e) => setData(e.target.value)}
                              placeholder="Drivers License"
                              className="border border-gray-400 py-7 px-4"
                            />

                            <div className="lg:relative fixed bottom-0 left-0 right-0 w-full pb-8 px-6 ">
                              <Button
                                type="submit"
                                className="w-full bg-[#F9A21B] hover:bg-[#f9a01bb5] rounded-full py-8">
                                {loading ? (
                                  <span className="flex items-center justify-center gap-2">
                                    <ClipLoader size={20} color="#fff" />
                                    {<span className="">Loading...</span>}
                                  </span>
                                ) : (
                                  <div className="text-center">
                                    <span className="font-semibold">Next</span>
                                  </div>
                                )}
                              </Button>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}
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

export default KycLicenceModal;
