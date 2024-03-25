"use client";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdError } from "react-icons/md";
import { formatCurrency } from "@/utils";
import { BsCopy } from "react-icons/bs";
import { IoIosArrowRoundBack } from "react-icons/io";
import toast from "react-hot-toast";

const PreviewPayment = ({
  data,
  isOpen,
  completeModal,
  handleComplete,
  handleCancelled,
  isLoading,
}: any) => {
  const copyAddress = async () => {
    await navigator.clipboard.writeText(data?.bank?.account_number);
    toast.success("Copied ✅");
  };
  return (
    <>
      {isOpen ? (
        <div
          className={`absolute top-0 bottom-0 right-0 left-0 w-full z-10 h-[100vh] bg-white lg:py-4 pb-10 pt-16 lg:px-20 px-6 ${
            completeModal ? `overflow-hidden` : `overflow-y-scroll`
          } overflow-y-scroll`}>
          <div className="relative">
            <IoIosArrowRoundBack
              onClick={handleCancelled}
              className="absolute left-4 top-0 text-3xl"
            />
            <h1 className="font-semibold lg:text-2xl text-lg text-center">
              Preview Payment
            </h1>
          </div>
          <div className="mx-auto lg:w-full w-12/12 mt-10">
            <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-x-20 gap-y-6 w-full">
              <div className=" shadow-b p-4">
                <p className="text-xs">Your payment amount</p>
                <h2 className="font-bold lg:text-2xl text-base">
                  <span className="text-xs">NGN</span>{" "}
                  {formatCurrency(data?.payment_amount)}
                </h2>
                <div className="mt-4 space-y-2 text-gray-600">
                  <p className="flex lg:text-md text-xs font-meduim items-center justify-between">
                    <span>Quantity:</span>{" "}
                    <span>
                      {" "}
                      {data?.quantity
                        ? parseFloat(data?.quantity?.toFixed(2))
                        : "0.00"}{" "}
                      USDT
                    </span>
                  </p>
                  <p className="flex lg:text-md text-xs font-meduim items-center justify-between">
                    <span>Order Number:</span> <span>{data?.order_number}</span>
                  </p>
                  <p className="flex lg:text-md text-xs font-meduim items-center justify-between">
                    <span>Wallet:</span> <span>{data?.wallet_address}</span>
                  </p>
                </div>
              </div>

              <div className=" shadow-b p-4">
                <div className="flex items-center">
                  <Avatar className="p-0 m-0">
                    <AvatarImage src={data?.merchant?.profile_picture} />
                    <AvatarFallback className="font-bold">
                      {data?.relationships?.user?.attributes?.first_name[0]}
                      {data?.relationships?.user?.attributes?.last_name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-sm ml-2">
                    {data?.merchant?.first_name} {data?.merchant?.last_name}
                  </p>
                </div>
                <div className="mt-4 space-y-2 text-gray-600">
                  <p className="flex lg:text-md text-sm font-meduim items-center justify-between">
                    <span>Bank Name:</span> <span>{data?.bank?.bank_name}</span>
                  </p>
                  <p className="flex lg:text-md text-sm font-meduim items-center justify-between">
                    <span>Account Number:</span>{" "}
                    <span className="flex items-center space-x-2">
                      {data?.bank?.account_number}{" "}
                      <BsCopy
                        onClick={copyAddress}
                        className="text-gray-500 ml-4"
                      />
                    </span>
                  </p>
                  <p className="flex lg:text-md text-sm font-meduim items-center justify-between">
                    <span>Account Name:</span>{" "}
                    <span>{data?.bank?.account_name}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-[#FFF8ED] py-4 px-6 lg:mt-4 mt-4">
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
          <div className=" mt-6 px-6 pb-8 fixed bottom-0 right-0 left-0 z-20 bg-white flex items-center justify-between">
            <Button
              onClick={handleCancelled}
              variant="outline"
              className="lg:py-7 py-7 px-8 lg:px-14 lg:text-md text-xs hover:bg-orange-50 hover:text-orange-500 font-bold rounded-full text-orange-400 border border-orange-400">
              Cancel Order
            </Button>
            <Button
              onClick={handleComplete}
              className="lg:py-7 py-7 px-8 lg:px-14 lg:text-md text-xs hover:bg-orange-500 hover:text-white font-bold rounded-full border text-white bg-orange-400">
              {isLoading ? "Loading..." : "Payment Complete"}
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default PreviewPayment;
