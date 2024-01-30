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

const CryptoSellForm = ({ data }: any) => {
  const [openBank, setOpenBank] = useState(true);
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [amount, setAmount] = useState("");
  const [ngnAmount, setNgnAmount] = useState<any>();
  const [point, setPoint] = useState("");
  const [address, setAddress] = useState(
    data?.data?.attributes?.wallet_address
  );
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
      if (resdata?.status == "success") {
        setIsLoading(false);
        setIsRedirecting(true);
        setIsChecked(true);
        toast.success(resdata?.message);
        setOpenBank(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="lg:w-5/12 w-10/12 mx-auto lg:mt-8 mt-20">
      <AddBankPage
        data={data}
        openBank={openBank}
        setOpenBank={setOpenBank}
      />
      <h1 className="font-bold text-2xl mb-6">Sell Crypto</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="relative flex items-center">
            <Input
              type="text"
              value={amount}
              placeholder="Enter Amount"
              className="w-full h-14 px-4 border border-gray-500"
              onChange={handleInputChange}
            />
            <span className="ml-[-3rem]">USD</span>
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
        <h2 className="lg:text-md text-xs font-semibold mt-4 mb-1">
          Trading Info
        </h2>
        <div className="flex items-center justify-between">
          <p className="lg:text-md text-xs">Amount in Naira</p>
          <p className="lg:text-md text-xs font-semibold">
            {formatCurrency(ngnAmount)} NGN
          </p>
        </div>
        <div className="points flex items-center justify-between mb-2 mt-4 bg-[#FFF8ED] py-5 px-6 shadow-md rounded-lg">
          <p className="font-medium text-sm">Point Earned</p>
          <p className="font-bold flex items-center text-sm">
            <Image src={coinImg} alt="coin" width="17" className="mr-1" />
            {point ? point : `0.00`}
          </p>
        </div>

        <div className="pt-2">
          <p className="text-gray-900 lg:text-md text-sm mb-2">
            Copy wallet address to send{" "}
            {data?.data?.attributes?.currency?.symbol}
          </p>
          <div className="flex items-center">
            <Input
              type="text"
              readOnly
              value={address}
              placeholder="Enter Amount"
              className="w-full h-12 px-6 text-gray-600 font-medium overflow-hidden border border-gray-500"
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
                  <p>Copy wallet Address</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="bg-[#FFF8ED] py-4 px-6 flex items-center space-x-6 mt-4">
          <MdError className="text-5xl text-orange-400" />
          <p className="text-xs text-gray-600">
            Only input a valid crypto address. Incorrect addresses may result in
            irreversible transactions.
          </p>
        </div>

        <div className="mt-6">
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
    </div>
  );
};

export default CryptoSellForm;
