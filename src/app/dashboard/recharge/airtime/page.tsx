"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { IoIosArrowRoundForward } from "react-icons/io";
import fetchToken from "@/lib/auth";

const AirtimePage = () => {
  const [openModal, setModal] = useState<boolean>(false);
  const [openSuccessModal, setSuccessModal] = useState<boolean>(false);
  const [selectedDataOption, setSelectedDataOption] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null || String);
  const [formData, setFormData] = useState({
    phone_number: "",
    points_to_be_redeemed: "",
  });

  useEffect(() => {
    fetchPointConverter();
  }, []);

  const handleOptionClick = (option: any) => {
    setSelectedDataOption(option);
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchPointConverter = async () => {
    const formdata = {
      points_to_redeem: 1,
    };
    try {
      const token = await fetchToken();
      const headers = {
        Authorization: `Bearer ${token?.data?.token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/mobile/point-converter`,
        {
          method: "POST",
          headers,
          body: JSON.stringify(formdata),
        }
      );

      const resdata = await res.json();
      //   if (resdata?.status == "success") {
      //     console.log(resdata);
      //   }
    } catch (error) {}
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(formData);
    fetchPointConverter();
  };

  const handleModal = () => {
    setModal(true);
  };
  const handleSuccessModal = () => {
    setModal(false);
    setSuccessModal(true);
  };

  return (
    <section className="h-screen w-10/12 mx-auto relative mt-20">
      <Link href="/dashboard" className="text-2xl">
        <IoIosArrowRoundBack className="absolute left-0 top-0 text-4xl" />
      </Link>
      <div className="pt-20">
        <h1 className="font-bold lg:text-2xl text-2xl">Airtime</h1>
        <p>Select a network provider</p>
      </div>
      <div className="">
        <div className="relative flex justify-between items-center gap-x-2 my-10">
          <div
            onClick={
              selectedDataOption === "mtn"
                ? () => handleOptionClick(null)
                : () => handleOptionClick("mtn")
            }
            className={`relative flex justify-center items-center h-16 w-16 rounded-full ${
              selectedDataOption === "mtn" ? "bg-[#28B82533]" : "bg-white"
            } `}>
            <Image
              src={"/new-mtn.svg"}
              alt="star"
              className=""
              width={50}
              height={50}
            />
            <div
              className={`absolute right-0 -top-[0.6rem] justify-center items-center rounded-full h-5 w-5 bg-white -ml-3 ${
                selectedDataOption === "mtn" ? "flex" : "hidden"
              }`}>
              <div className="flex justify-center items-center rounded-full h-4 w-4 bg-[#04DF00]">
                <FaCheck className="text-white text-xs" />
              </div>
            </div>
          </div>
          <div
            onClick={
              selectedDataOption === "glo"
                ? () => handleOptionClick(null)
                : () => handleOptionClick("glo")
            }
            className={`relative flex justify-center items-center h-16 w-16 rounded-full ${
              selectedDataOption === "glo" ? "bg-[#28B82533]" : "bg-white"
            } `}>
            <Image
              src={"/new-glo.svg"}
              alt="star"
              className=""
              width={50}
              height={50}
            />
            <div
              className={`absolute right-0 -top-[0.6rem] justify-center items-center rounded-full h-7 w-7 bg-white -ml-3 ${
                selectedDataOption === "glo" ? "flex" : "hidden"
              }`}>
              <div className="flex justify-center items-center rounded-full h-5 w-5 bg-[#04DF00]">
                <FaCheck className="text-white text-xs" />
              </div>
            </div>
          </div>
          <div
            onClick={
              selectedDataOption === "airtel"
                ? () => handleOptionClick(null)
                : () => handleOptionClick("airtel")
            }
            className={`relative flex justify-center items-center h-16 w-16 rounded-full ${
              selectedDataOption === "airtel" ? "bg-[#28B82533]" : "bg-white"
            } `}>
            <Image
              src={"/new-airtel.svg"}
              alt="star"
              className=""
              width={50}
              height={50}
            />
            <div
              className={`absolute right-0 -top-[0.6rem] justify-center items-center rounded-full h-7 w-7 bg-white -ml-3 ${
                selectedDataOption === "airtel" ? "flex" : "hidden"
              }`}>
              <div className="flex justify-center items-center rounded-full h-5 w-5 bg-[#04DF00]">
                <FaCheck className="text-white text-xs" />
              </div>
            </div>
          </div>
          <div
            onClick={
              selectedDataOption === "mobile"
                ? () => handleOptionClick(null)
                : () => handleOptionClick("mobile")
            }
            className={`relative flex justify-center items-center h-16 w-16 rounded-full ${
              selectedDataOption === "mobile" ? "bg-[#28B82533]" : "bg-white"
            } `}>
            <Image
              src={"/new-mobile.svg"}
              alt="star"
              className=""
              width={50}
              height={50}
            />
            <div
              className={`absolute right-0 -top-[0.6rem] justify-center items-center rounded-full h-9 w-9 bg-white -ml-3 ${
                selectedDataOption === "mobile" ? "flex" : "hidden"
              }`}>
              <div className="flex justify-center items-center rounded-full h-5 w-5 bg-[#04DF00]">
                <FaCheck className="text-white text-xs" />
              </div>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="points"
              className="block text-sm font-medium text-[#323232] mb-4">
              Enter Phone Number
            </label>
            <Input
              type="number"
              name="phone_number"
              value={formData?.phone_number}
              onChange={handleChange}
              className="w-full text-sm font-medium text-black placeholder:text-[#000000a6] outline-none border-b border-solid border-[#D9D9D9] px-4 py-7"
              placeholder="704 5495 996"
            />
          </div>
          <div className="form-control mt-4">
            <Label className="text-gray-500">Enter points to redeem</Label>
            <div className="relative flex items-center mt-1">
              <Input
                type="text"
                name="points_to_be_redeemed"
                value={formData?.points_to_be_redeemed}
                placeholder="0"
                className="w-full h-14 px-6 text-gray-600 overflow-hidden border border-gray-300"
                onChange={handleChange}
              />
              <span className="ml-[-3rem] text-orange-400 lg:text-sm text-xs">
                MAX
              </span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <p className="text-sm text-gray-400">1 Points = NGN600</p>
              <p className="text-sm text-gray-400">Balance 550</p>
            </div>
          </div>
          <div className="mt-6 px-8 pb-8 fixed bottom-0 right-0 left-0 z-10 bg-white">
            <Button
              type="submit"
              className={`w-full py-7 text-center rounded-full ${
                selectedOption
                  ? "bg-[#F9A21B] hover:bg-[#ffb151]"
                  : "bg-[#f9a01b9c] cursor-not-allowed"
              } px-6`}>
              <div className="text-center mx-auto w-full">
                <div className="text-center">
                  <span className="font-semibold">Redeem Points</span>
                </div>
              </div>
              <IoIosArrowRoundForward className="ml-auto text-3xl" />
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AirtimePage;
