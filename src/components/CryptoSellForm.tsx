"use client";
import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import ClipLoader from "react-spinners/ClipLoader";
import { Input } from "./ui/input";
import { MdContentCopy } from "react-icons/md";
import coinImg from "@/public/coin.png";
import { MdError } from "react-icons/md";
import { FaLongArrowAltRight } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatCurrency } from "@/utils";
import fetchToken from "@/lib/auth";
import AddBankPage from "./AddBank";
import ChatPage from "./ChatPage";
import Link from "next/link";
import { IoIosArrowRoundBack } from "react-icons/io";
import { CryptoCarousel } from "./ui/CryptoCarousel";

const CryptoSellForm = ({ data }: any) => {
  const [openBank, setOpenBank] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [amount, setAmount] = useState("");
  const [chatRoomID, setChatRoomID] = useState("");
  const [ngnAmount, setNgnAmount] = useState<any>();
  const [point, setPoint] = useState("");
  const [address, setAddress] = useState(
    data?.data?.attributes?.wallet_address
  );
  const [transID, setTransID] = useState({});
  const [isCopied, setIsCopied] = useState(false);

  const handleInputChange = async (event: { target: { value: any } }) => {
    const inputValue = event.target.value;

    if (!/^\d*$/.test(inputValue)) {
      // Check if the input contains only non-numeric characters
      // If the input contains letters, do not update the state
      return;
    }

    const enteredAmount = parseFloat(inputValue);

    if (
      enteredAmount >= data?.data?.attributes?.max_amount ||
      enteredAmount <= data?.data?.attributes?.min_amount - 1
    ) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }

    // Update the state with the formatted money value
    setAmount(inputValue);
    const conversion = event.target.value * data?.data?.attributes?.rate;
    setNgnAmount(conversion);

    const token = await fetchToken();

    if (event.target.value >= 100) {
      const headers = {
        Authorization: `Bearer ${token?.data?.token}`,
        "Content-Type": "application/json",
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/points?transaction_amount=${event.target.value}`,
        {
          headers,
        }
      );

      const point = await res.json();

      setPoint(point?.data);
    }
  };

  const copyAddress = async () => {
    await navigator.clipboard.writeText(address);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = {
      amount: amount,
      merchant_id: data?.data?.relationships?.user?.id,
      crypto_offer_id: data?.data?.id,
      type: "sell",
      wallet_address: address,
      total_amount: ngnAmount,
    };

    try {
      const token = await fetchToken();
      const headers = {
        Authorization: `Bearer ${token?.data?.token}`,
        "Content-Type": "application/json",
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/mobile/initiate-crypto-transaction`,
        {
          method: "POST",
          headers,
          body: JSON.stringify(formData),
        }
      );

      const resdata = await res.json();
      setTransID(resdata);
      setChatRoomID(resdata?.data?.relationships?.chat_room_id);
      if (resdata?.status == "success") {
        setIsLoading(false);
        setIsRedirecting(true);
        setIsChecked(true);
        toast.success(resdata?.message);
        setOpenBank(true);
      }
      // console.log(resdata);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsRedirecting(false);
    }
  };

  return (
    <div className=" lg:mt-0  mt-8">
      <AddBankPage
        data={transID}
        type="crypto_transaction"
        userData={data?.data?.relationships?.user}
        openBank={openBank}
        setOpenBank={setOpenBank}
        setOpenChat={setOpenChat}
      />
      {openChat && (
        <ChatPage
          chatRoomID={chatRoomID}
          userData={data?.data?.relationships?.user}
        />
      )}
      <div className="relative">
        <Link href={`/dashboard/`}>
          <IoIosArrowRoundBack className="absolute left-4 top-0 text-3xl" />
        </Link>
        <h1 className="font-semibold lg:text-2xl text-lg text-center mb-4">
          Sell Crypto
        </h1>
        <div className="my-8">
          <CryptoCarousel />
        </div>
        <div className="lg:w-5/12 w-10/12 mx-auto pb-[9rem] mt-8">
          <form onSubmit={handleSubmit}>
            <div>
              <div className="relative flex items-center">
                <Input
                  type="text"
                  value={amount}
                  placeholder="Enter Amount"
                  className="w-full h-14 px-6 text-gray-600 overflow-hidden border border-gray-300"
                  onChange={handleInputChange}
                />
                <span className="ml-[-3rem] lg:text-sm text-xs">USD</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-500 text-xs mt-1">
                  Rate:{" "}
                  <span className="text-xs">
                    {formatCurrency(data?.data?.attributes?.rate)}
                  </span>
                </p>
                <small className="text-gray-500 text-xs mt-1">
                  Limit:{" "}
                  <span className="text-xs">
                    {formatCurrency(data?.data?.attributes?.min_amount)} -{" "}
                    {formatCurrency(data?.data?.attributes?.max_amount)}
                  </span>
                </small>
              </div>
            </div>
            <h2 className="lg:text-md text-xs font-semibold mt-8 mb-1">
              Trading Info
            </h2>

            <div className="flex items-center justify-between">
              <p className="lg:text-md text-xs">Amount in Naira</p>
              <p className="lg:text-md text-xs font-semibold">
                {formatCurrency(ngnAmount)} NGN
              </p>
            </div>

            <div className="points flex items-center justify-between mb-2 mt-4 bg-[#FFF8ED] py-4 px-6 shadow-md rounded-lg">
              <p className="font-medium text-sm">Point Earned</p>
              <p className="font-bold flex items-center text-sm">
                <Image src={coinImg} alt="coin" width="17" className="mr-1" />
                {point ? point : `0.00`}
              </p>
            </div>

            <div className="mt-6 px-8 pb-8 fixed bottom-0 right-0 left-0 z-10 bg-white">
              {isRedirecting ? (
                <Button
                  disabled={isChecked}
                  className="w-full mt-8 py-7 rounded-full bg-[#F9A21B] hover:bg-[#ffb151] flex items-center px-6">
                  <span className="flex items-center justify-center gap-2">
                    <ClipLoader size={20} color="#fff" />
                    {<span className="">Redirecting... please wait</span>}
                  </span>
                </Button>
              ) : (
                <Button
                  disabled={isChecked}
                  type="submit"
                  className="w-full mt-8 py-7 rounded-full bg-[#F9A21B] hover:bg-[#ffb151] flex items-center px-6">
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <ClipLoader size={20} color="#fff" />
                      {<span className="">Loading...</span>}
                    </span>
                  ) : (
                    <>
                      <span className="font-bold">Continue</span>
                    </>
                  )}
                  <FaLongArrowAltRight className="ml-auto text-2xl" />
                </Button>
              )}
            </div>
          </form>
          <div className="pt-4">
            <p className="text-gray-900 lg:text-sm text-xs mb-2">
              Copy wallet address to send{" "}
              {data?.data?.attributes?.currency?.symbol}
            </p>
            <div className="flex items-center">
              <Input
                type="text"
                readOnly
                value={address}
                placeholder="Enter Amount"
                className="w-full h-14 px-6 text-gray-600 font-medium overflow-hidden border border-gray-500"
                onChange={handleInputChange}
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="relative">
                    <MdContentCopy
                      onClick={copyAddress}
                      className={`cursor-pointer text-2xl ml-[-2rem] ${
                        isCopied && `text-green-400`
                      }`}
                    />
                    {isCopied && (
                      <p className="whitespace-nowrap absolute top-[-2rem] text-xs font-bold text-green-400 right-2">
                        Copied ✅
                      </p>
                    )}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Copy address</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <div className="bg-[#FFF8ED] py-4 px-6 flex items-center space-x-6 mt-4">
            <MdError className="text-5xl text-orange-400" />
            <p className="text-xs text-gray-600">
              Only input a valid crypto address. Incorrect addresses may result
              in irreversible transactions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoSellForm;
