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
  const [point, setPoint] = useState("");
  const [code, setCode] = useState("");
  const [previewInfo, setPreviewInfo] = useState({});
  const [previewSrcs, setPreviewSrcs] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [transID, setTransID] = useState({});
  const [ngnAmount, setNgnAmount] = useState<any>();

  // console.log(data);

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
    const conversion = event.target.value * data?.data?.offer?.attributes?.rate;
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

  const currencyID: any = localStorage.getItem("selectedCurrency");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = await fetchToken();

      const formData = new FormData();
      formData.append("amount", amount.toString());
      formData.append("currency_id", currencyID);
      formData.append(
        "merchant_id",
        data?.data?.offer?.relationships?.merchant?.id || ""
      );
      formData.append(
        "gift_card_id",
        data?.data?.offer?.relationships?.gift_cards?.id || ""
      );
      formData.append("type", "sell");
      formData.append("e-code", code);
      // Append the file only if it exists
      if (selectedFiles) {
        selectedFiles?.forEach((file, index) => {
          formData?.append(`card_image[${index}]`, file);
        });
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/transactions`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token?.data?.token}`,
            Accept: "application/json",
          },
          body: formData,
        }
      );

      const resdata = await res.json();
      setTransID(resdata);
      if (resdata?.status === "success") {
        setIsLoading(false);
        setIsRedirecting(true);
        setIsChecked(true);
        toast.success(resdata?.message);
        setIsOpen(true);
      }
      setPreviewInfo(resdata?.data);
      console.log(resdata);
    } catch (error) {
    } finally {
      setIsLoading(false);
      setIsRedirecting(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const newFiles: File[] = Array.from(files);

      const newPreviews: string[] = [];
      newFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result as string);
          if (newPreviews.length === newFiles.length) {
            setPreviewSrcs([...previewSrcs, ...newPreviews]);
            setSelectedFiles([...selectedFiles, ...newFiles]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedPreviewSrcs = [...previewSrcs];
    updatedPreviewSrcs.splice(index, 1);
    setPreviewSrcs(updatedPreviewSrcs);

    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  return (
    <div className="lg:w-5/12 w-10/12 mx-auto pb-40 lg:mt-0  mt-6">
      <AddBankPage
        data={transID}
        type="gift_card_transaction"
        userData={data?.data?.offer?.relationships?.merchant}
        openBank={isOpen}
        setOpenBank={setIsOpen}
      />
      <h1 className="font-bold lg:text-2xl text-xl mb-6">Sell Giftcard</h1>
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

        <div className="pt-4">
          <h2 className="font-semibold mb-2">Upload gift card</h2>
          <div className="flex items-center">
            <Input
              type="text"
              value={code}
              placeholder="Enter code"
              className="w-full h-14 px-6 text-gray-600 font-medium overflow-hidden border border-gray-500"
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-x-4 items-center relative overflow-y-auto pt-10 border border-orange-300 mt-6 rounded-xl p-6 lg:h-[8rem] h-[6rem]">
          <div>
            <label
              htmlFor="fileInput"
              className="flex justify-center items-center border-2 lg:h-14 h-10 lg:w-20 w-10 border-orange-200 rounded p-2 cursor-pointer">
              <BsPlus className="text-5xl text-orange-200" />
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                className="hidden"
                multiple
                onChange={handleFileChange}
              />
            </label>
          </div>
          <div className="overflow-hidden lg:p-6  w-full grid grid-cols-3 ">
            {previewSrcs.map((previewSrc, index) => (
              <div key={index} className="relative inline-block mr-4 mb-4">
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-white p-1 rounded-full"
                  onClick={() => handleRemoveImage(index)}>
                  <MdError className="text-red-500" />
                </button>
                <Image
                  src={previewSrc}
                  alt="File Preview"
                  width={100}
                  height={100}
                  layout="fixed"
                />
              </div>
            ))}
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
