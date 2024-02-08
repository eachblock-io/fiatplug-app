"use client";
import { useState, ChangeEvent } from "react";
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
import { BsPlus } from "react-icons/bs";
import AddBankPage from "./AddBank";

const GiftcardSellForm = ({ data }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [amount, setAmount] = useState("");
  const [quantity, setQuantity] = useState<any>();
  const [point, setPoint] = useState("");
  const [code, setCode] = useState("");
  const [previewInfo, setPreviewInfo] = useState({});
  const [previewSrc, setPreviewSrc] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [transID, setTransID] = useState({});

  const handleInputChange = async (event: { target: { value: any } }) => {
    const inputValue = event.target.value;

    if (!/^\d*$/.test(inputValue)) {
      // Check if the input contains only non-numeric characters
      // If the input contains letters, do not update the state
      return;
    }

    const enteredAmount = parseFloat(inputValue);

    if (
      enteredAmount >= data?.data?.offer?.attributes?.max_limit ||
      enteredAmount <= data?.data?.offer?.attributes?.min_limit - 1
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
      console.log(point?.data);
    }
  };

  const currencyID: any = localStorage.getItem("selectedCurrency");

  // console.log(data);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = {
      amount: amount,
      currency_id: currencyID,
      merchant_id: data?.data?.offer?.relationships?.merchant?.id,
      gift_card_id: data?.data?.offer?.relationships?.gift_cards?.id,
      type: "sell",
      "e-code": code,
      card_image: selectedFile,
    };

    // setIsOpen(true);
    console.log(formData);

    try {
      const token = await fetchToken();
      const headers = {
        Authorization: `Bearer ${token?.data?.token}`,
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/transactions`,
        {
          method: "POST",
          headers,
          body: JSON.stringify(formData),
        }
      );

      const resdata = await res.json();
      setTransID(resdata);
      if (resdata?.status == "success") {
        setIsLoading(false);
        setIsRedirecting(true);
        setIsChecked(true);
        toast.success(resdata?.message);
        setIsOpen(true);
      }
      setPreviewInfo(resdata?.data);
      console.log(resdata?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsRedirecting(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewSrc(reader.result as string);
      };

      reader.readAsDataURL(file);
      setSelectedFile(file);
    } else {
      setPreviewSrc("");
    }
  };

  return (
    <div className="lg:w-5/12 w-10/12 mx-auto pb-10 lg:mt-8  mt-20">
      <AddBankPage data={transID} openBank={isOpen} setOpenBank={setIsOpen} />
      <h1 className="font-semibold lg:text-2xl text-xl mb-6">Sell Giftcard</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="relative flex items-center">
            <Input
              type="text"
              required
              value={amount}
              placeholder="Enter Amount"
              className="w-full h-14 px-4 border border-gray-500"
              onChange={handleInputChange}
            />
            <span className="ml-[-3rem]">NGN</span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-500 text-xs mt-1">
              Rate:{" "}
              <span className="text-xs">
                {formatCurrency(data?.data?.offer?.attributes?.rate)}
              </span>
            </p>
            <small className="text-gray-500 text-xs mt-1">
              Limit:{" "}
              <span className="text-xs">
                {formatCurrency(data?.data?.offer?.attributes?.min_limit)} -{" "}
                {formatCurrency(data?.data?.offer?.attributes?.max_limit)}
              </span>
            </small>
          </div>
        </div>
        {/* <h2 className="lg:text-md text-xs font-semibold mt-4 mb-1">
          Trading Info
        </h2>
        <div>
          <div className="flex items-center justify-between">
            <p className="lg:text-md text-xs">Quantity</p>
            <p className="lg:text-md text-xs font-semibold">
              {quantity ? parseFloat(quantity?.toFixed(2)) : "0.00"} USD
            </p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="lg:text-md text-xs">Payment</p>
            <p className="lg:text-md text-xs font-semibold">
              {formatCurrency(amount)} NGN
            </p>
          </div>
        </div> */}
        <div className="points flex items-center justify-between mb-2 mt-4 bg-[#FFF8ED] py-5 px-6 shadow-md rounded-lg">
          <p className="font-medium text-sm">Point Earned</p>
          <p className="font-bold flex items-center text-sm">
            <Image src={coinImg} alt="coin" width="17" className="mr-1" />
            {point ? point : `0.00`}
          </p>
        </div>

        <div className="pt-4">
          <h2 className="font-semibold mb-2">Upload gift card</h2>
          <div className="flex items-center">
            <Input
              type="text"
              required
              value={code}
              placeholder="Enter code"
              className="w-full h-14 px-6 text-gray-600 font-medium overflow-hidden border border-gray-500"
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 items-center relative overflow-hidden border border-orange-300 mt-6 rounded-xl p-6 h-[10rem]">
          <div>
            <label
              htmlFor="fileInput"
              className="flex justify-center items-center border-2 h-14 w-20 border-orange-200 rounded p-2 cursor-pointer">
              <BsPlus className="text-4xl text-orange-200" />
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
          <div className="overflow-hidden lg:p-6">
            {previewSrc && (
              <Image
                src={previewSrc}
                alt="File Preview"
                width={300}
                height={200}
                layout="fixed"
              />
            )}
          </div>
        </div>

        <div className="mt-6">
          {isRedirecting ? (
            <Button
              disabled={isChecked}
              className="w-full py-7 rounded-full bg-[#F9A21B] hover:bg-[#ffb151] flex items-center px-6">
              <span className="flex items-center justify-center gap-2">
                <ClipLoader size={20} color="#fff" />
                {<span className="">Redirecting... please wait</span>}
              </span>
            </Button>
          ) : (
            <Button
              disabled={isChecked}
              className="w-full py-7 rounded-full bg-[#F9A21B] hover:bg-[#ffb151] flex items-center px-6">
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

export default GiftcardSellForm;
