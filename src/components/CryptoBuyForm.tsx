"use client";
import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import ClipLoader from "react-spinners/ClipLoader";
import { Input } from "./ui/input";
import coinImg from "@/public/coin.png";
import { MdError } from "react-icons/md";
import { FaLongArrowAltRight } from "react-icons/fa";
import { formatCurrency } from "@/utils";
import fetchToken from "@/lib/auth";
import PreviewPayment from "@/components/PreviewPayment";
import CompleteModal from "./CompleteModal";
import ChatPage from "./ChatPage";
import Link from "next/link";
import { CryptoCarousel } from "./ui/CryptoCarousel";
import { IoIosArrowRoundBack } from "react-icons/io";

const CryptoBuyForm = ({ data }: any) => {
  const [isOpen, setIsOpen] = useState(true);
  const [openChat, setOpenChat] = useState(false);
  const [completeModal, setCompleteModal] = useState(false);
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [amount, setAmount] = useState("");
  const [quantity, setQuantity] = useState<any>();
  const [point, setPoint] = useState("");
  const [chatRoomID, setChatRoomID] = useState("");
  const [address, setAddress] = useState("");
  const [previewInfo, setPreviewInfo] = useState<any>({});

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
    const conversion = event.target.value / data?.data?.attributes?.rate;
    setQuantity(conversion);

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

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = {
      amount: amount,
      merchant_id: data?.data?.relationships?.user?.id,
      crypto_offer_id: data?.data?.id,
      type: "buy",
      quantity: quantity,
      wallet_address: address,
      total_amount: amount,
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
      setChatRoomID(resdata?.data?.chat_room_id);
      if (resdata?.status == "success") {
        setIsLoading(false);
        setIsRedirecting(true);
        setIsChecked(true);
        toast.success(resdata?.message);
        setIsOpen(true);
      }
      setPreviewInfo(resdata?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsRedirecting(false);
    }
  };

  const handleComplete = async () => {
    setIsLoading(true);

    try {
      const token = await fetchToken();
      const headers = {
        Authorization: `Bearer ${token?.data?.token}`,
        "Content-Type": "application/json",
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/mobile/update-transaction`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            id: previewInfo?.id,
            status: "completed",
            type: "crypto_transaction",
          }),
        }
      );

      const resdata = await res.json();
      if (resdata?.status == "success") {
        setCompleteModal(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartChat = () => {
    setCompleteModal(false);
    setIsOpen(false);
    setOpenChat(true);
  };

  const handleCancelled = async () => {
    setIsOpen(false);

    try {
      const token = await fetchToken();
      const headers = {
        Authorization: `Bearer ${token?.data?.token}`,
        "Content-Type": "application/json",
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/mobile/update-transaction`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            id: previewInfo?.id,
            status: "cancelled",
            type: "crypto_transaction",
          }),
        }
      );

      const resdata = await res.json();
      if (resdata?.status == "success") {
        setIsLoading(false);
        setIsOpen(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PreviewPayment
        data={previewInfo}
        isOpen={isOpen}
        isLoading={isLoading}
        setIsOpen={setIsOpen}
        handleComplete={handleComplete}
        completeModal={completeModal}
        setCompleteModal={setCompleteModal}
        handleCancelled={handleCancelled}
        handleStartChat={handleStartChat}
        openChat={openChat}
        userData={data?.data?.relationships?.user}
      />
      <CompleteModal
        completeModal={completeModal}
        data={previewInfo}
        handleStartChat={handleStartChat}
        setCompleteModal={setCompleteModal}
      />
      {openChat && (
        <ChatPage
          userData={data?.data?.relationships?.user}
          chatRoomID={chatRoomID}
        />
      )}
      <div className="relative mt-10">
        <Link href={`/dashboard`}>
          <IoIosArrowRoundBack className="absolute left-4 top-0 text-3xl" />
        </Link>
        <h1 className="font-semibold lg:text-2xl text-lg text-center mb-4">
          Buy Crypto
        </h1>
        <div className="mt-4">
          <CryptoCarousel />
        </div>
        <form
          onSubmit={handleSubmit}
          className="lg:w-5/12 w-10/12 mx-auto pb-[9rem] mt-6">
          <div>
            <div className="relative flex items-center">
              <Input
                type="text"
                required
                value={amount}
                placeholder="Enter Amount"
                className="w-full h-14 px-4 placeholder:text-xs border border-gray-500"
                onChange={handleInputChange}
              />
              <span className="ml-[-3rem] text-xs">NGN</span>
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
          <div>
            <div className="flex items-center justify-between">
              <p className="lg:text-md text-xs">Quantity</p>
              <p className="lg:text-md text-xs font-semibold">
                {quantity ? parseFloat(quantity?.toFixed(2)) : "0.00"} USD
              </p>
            </div>
            <div className="flex items-center justify-between mt-1">
              <p className="lg:text-md text-xs">Payment</p>
              <p className="lg:text-md text-xs font-semibold">
                {formatCurrency(amount)} NGN
              </p>
            </div>
          </div>
          <div className="points flex items-center justify-between mb-2 mt-4 bg-[#FFF8ED] py-4 px-6 shadow-md rounded-lg">
            <p className="font-medium text-xs">Point Earned</p>
            <p className="font-bold flex items-center text-sm">
              <Image src={coinImg} alt="coin" width="17" className="mr-1" />
              {point ? point : `0.00`}
            </p>
          </div>

          <div className="pt-4">
            <p className="text-gray-900 lg:text-sm text-xs mb-2">
              Paste your wallet address{" "}
              {data?.data?.attributes?.currency?.symbol}
            </p>
            <div className="flex items-center">
              <Input
                type="text"
                required
                value={address}
                placeholder="Wallet address"
                className="w-full h-14 px-6 text-gray-600 placeholder:text-xs overflow-hidden border border-gray-500"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-[#FFF8ED] py-4 px-6 flex items-center space-x-6 mt-4">
            <MdError className="text-4xl text-orange-400" />
            <p className="text-xs text-gray-600">
              Only input a valid crypto address. Incorrect addresses may result
              in irreversible transactions.
            </p>
          </div>

          <div className="p-2">
            <h2 className="text-sm font-semibold text-red-800">Trade terms</h2>
            <p className="text-xs text-red-800">
              {data?.data?.attributes?.terms}
            </p>
          </div>

          <div className="mt-6 px-8 pb-8 fixed bottom-0 right-0 left-0 bg-white">
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
    </>
  );
};

export default CryptoBuyForm;
