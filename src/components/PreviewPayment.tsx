"use client";
import React from "react";
import { Button } from "./ui/button";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdError } from "react-icons/md";
import { formatCurrency } from "@/utils";
import img1 from "@/public/undraw_season_change_f99v 1.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

PreviewPaymentconst  = ({
  data,
  isOpen,
  setIsOpen,
  completeModal,
  handleComplete,
  handleCancelled,
}: any) => {
  const { push } = useRouter();
  // console.log(data);
  return (
    <>
      {isOpen ? (
        <div className="absolute top-0 bottom-0 right-0 left-0 w-full z-10 lg:h-full h-[88vh] bg-white lg:py-4 pb-10 pt-16 lg:px-20 px-10 overflow-y-scroll">
          {completeModal && (
            <div className="flex items-center justify-center bg-white bg-opacity-80 z-10 absolute top-0 right-0 left-0 lg:h-full h-[80vh]">
              <div className="shadow-2xl rounded-lg text-center bg-white lg:p-14 p-8 lg:w-4/12 w-10/12">
                <Image
                  src={img1}
                  alt="chat"
                  width={200}
                  height={300}
                  layout="fixed"
                  className="mx-auto"
                />
                <p className="py-6 lg:px-8 text-sm">
                  Your USDT purchase is in progress with a 10-minute
                  confirmation time. Reach out to our support team for
                  assistance
                </p>
                <Button
                  onClick={() => push("/dashboard/chat")}
                  className="w-full py-7 rounded-full bg-[#F9A21B] hover:bg-[#ffb151] flex items-center px-6">
                  Chat with merchant
                </Button>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between lg:pt-4 pt-4">
            <h2 className="font-semibold lg:text-xl text-lg">
              Preview Payment
            </h2>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              className="flex items-center">
              <FaLongArrowAltLeft className="text-xl" />
            </Button>
          </div>
          <div className="mx-auto lg:w-full w-12/12 lg:mt-6 mt-4">
            <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-x-20 gap-y-10 w-full">
              <div>
                <p className="text-sm">Your payment amount</p>
                <h2 className="font-bold lg:text-2xl text-lg">
                  NGN {formatCurrency(data?.payment_amount)}
                </h2>
                <div className="mt-4 space-y-2 text-gray-600">
                  <p className="flex lg:text-md text-sm items-center justify-between">
                    <span>Quantity:</span>{" "}
                    <span>
                      {" "}
                      {data?.quantity
                        ? parseFloat(data?.quantity?.toFixed(2))
                        : "0.00"}{" "}
                      USDT
                    </span>
                  </p>
                  <p className="flex lg:text-md text-sm items-center justify-between">
                    <span>Order Number:</span> <span>{data?.order_number}</span>
                  </p>
                  <p className="flex lg:text-md text-sm items-center justify-between">
                    <span>Wallet:</span> <span>{data?.wallet_address}</span>
                  </p>
                </div>
              </div>

              <div className="">
                <div className="flex items-center">
                  <Avatar className="p-0 m-0">
                    <AvatarImage src={data?.merchant?.profile_picture} />
                    <AvatarFallback className="font-bold">
                      {data?.relationships?.user?.attributes?.first_name[0]}
                      {data?.relationships?.user?.attributes?.last_name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-xs ml-2">
                    {data?.merchant?.first_name} {data?.merchant?.last_name}
                  </p>
                </div>
                <div className="mt-4 space-y-2 text-gray-600">
                  <p className="flex lg:text-md text-sm items-center justify-between">
                    <span>Bank Name:</span> <span>{data?.bank?.bank_name}</span>
                  </p>
                  <p className="flex lg:text-md text-sm items-center justify-between">
                    <span>Account Number:</span>{" "}
                    <span>{data?.bank?.account_number}</span>
                  </p>
                  <p className="flex lg:text-md text-sm items-center justify-between">
                    <span>Account Name:</span>{" "}
                    <span>{data?.bank?.account_name}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-[#FFF8ED] py-4 px-6 lg:mt-8 mt-4">
              <p className="flex items-center space-x-4 text-md">
                <MdError className="text-2xl text-orange-400" />
                <span>Note</span>
              </p>
              <ul>
                <li className="text-xs mt-4 text-gray-600">
                  Only choose <b>confirm payments</b> when the payment has been
                  successfully made, as failing to do so may result in the
                  suspension of your account.
                </li>
                <li className="text-xs mt-2 text-gray-600">
                  You can engage with the fiatplug seller via chat to expedite
                  your trade.
                </li>
                <li className="text-xs mt-2 text-gray-600">
                  Please refrain from including cryptocurrency-related terms
                  (such as BTC, USDT, ETH) in payment{" "}
                </li>
              </ul>
            </div>
          </div>
          <div className=" bg-white w-full btns flex items-center lg:space-x-8 space-x-8 h-[10vh] lg:mt-20">
            <Button
              onClick={handleCancelled}
              variant="outline"
              className="lg:py-7 py-6 px-6 lg:px-14 lg:text-md text-xs hover:bg-orange-50 hover:text-orange-500 font-bold rounded-full text-orange-400 border border-orange-400">
              Cancel Order
            </Button>
            <Button
              onClick={handleComplete}
              className="lg:py-7 py-6 px-6 lg:px-14 lg:text-md text-xs hover:bg-orange-500 hover:text-white font-bold rounded-full text-white bg-orange-400">
              Payment Complete
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default PreviewPayment;
