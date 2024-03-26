"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoIosArrowRoundForward } from "react-icons/io";
import fetchToken from "@/lib/auth";
import mtnImg from "@/public/new-mtn.svg";
import gloImg from "@/public/new-glo.svg";
import airtelImg from "@/public/new-airtel.svg";
import mobileImg from "@/public/new-mobile.svg";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency } from "@/utils";
import { Label } from "@/components/ui/label";
import Preview from "./@preview/page";

const DataPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedDataOption, setSelectedDataOption] = useState(null);
  const [dataPlan, setDataPlan] = useState([]);
  const [formData, setFormData] = useState({
    phone_number: "",
    points_to_be_redeemed: "",
  });
  const [dataPlans, setDataPlans] = useState([
    {
      service: "Mtn",
      code: "D04D",
      img: mtnImg,
    },
    {
      service: "Globacom",
      code: "D03D",
      img: gloImg,
    },
    {
      service: "Airtel",
      code: "D01D",
      img: airtelImg,
    },
    {
      service: "9 Mobile",
      code: "D02D",
      img: mobileImg,
    },
  ]);
  const [dataBundle, setDataBundle] = useState("");
  const [pointBalance, setPointBalance] = useState("");
  const [previewData, setPreviewData] = useState({});

  useEffect(() => {
    fetchPointBalance();
  }, []);

  const handleOptionClick = async (option: any) => {
    setSelectedDataOption(option);
    try {
      const token = await fetchToken();
      const headers = {
        Authorization: `Bearer ${token?.data?.token}`,
        "Content-Type": "application/json",
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/mobile/get-data-plan`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({ service_code: option }),
        }
      );

      const resdata = await res.json();
      if (resdata?.status == "success") {
        setDataPlan(resdata?.data?.dataPlan);
      }
    } catch (error) {}
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchPointBalance = async () => {
    try {
      const token = await fetchToken();
      const headers = {
        Authorization: `Bearer ${token?.data?.token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/mobile/my-earned-points`,
        {
          headers,
        }
      );

      const resdata = await res.json();
      if (resdata?.status == "success") {
        setPointBalance(resdata?.data?.display_data?.naira_equivalent);
      }
    } catch (error) {}
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const formdata = {
      billing_type: "data",
      service_code: selectedDataOption,
      product_id: dataBundle,
      phone_number: formData?.phone_number,
      points_to_be_redeemed: formData?.points_to_be_redeemed,
    };
    setPreviewData(formdata);
    setOpen(true);
  };

  return (
    <section className="h-screen w-10/12 mx-auto relative mt-20">
      <Preview open={open} setOpen={setOpen} data={previewData} />
      <Link href="/dashboard" className="text-2xl">
        <IoIosArrowRoundBack className="absolute left-0 top-0 text-4xl" />
      </Link>
      <div className="pt-20">
        <h1 className="font-bold lg:text-2xl text-2xl">Data</h1>
        <p>Select a network provider</p>
      </div>
      <div className="">
        <div className="relative flex justify-between items-center gap-x-2 my-10">
          {dataPlans?.map((data) => (
            <div
              key={data?.code}
              onClick={() => handleOptionClick(data?.code)}
              className={`relative flex justify-center items-center h-16 w-16 rounded-full ${
                selectedDataOption === data?.code
                  ? "bg-[#28B82533]"
                  : "bg-white"
              } `}>
              <Image
                src={data?.img}
                alt="star"
                className=""
                width={50}
                height={50}
              />
              <div
                className={`absolute right-0 -top-[0.6rem] justify-center items-center rounded-full h-5 w-5 bg-white -ml-3 ${
                  selectedDataOption === data?.code ? "flex" : "hidden"
                }`}>
                <div className="flex justify-center items-center rounded-full h-4 w-4 bg-[#04DF00]">
                  <FaCheck className="text-white text-xs" />
                </div>
              </div>
            </div>
          ))}
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
              <p className="text-sm text-gray-400">
                Balance N{formatCurrency(pointBalance)}
              </p>
            </div>
          </div>
          {dataPlan?.length > 0 && (
            <div className="form-control mt-4">
              <Select
                value={dataBundle}
                name="dataBundle"
                onValueChange={(value) => setDataBundle(value)}>
                <SelectTrigger className="w-full h-14 outline-none">
                  <SelectValue placeholder="Select data bundles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {dataPlan?.map((data: any, i) => (
                      <SelectItem key={i} value={data?.productId}>
                        N{formatCurrency(data?.amount)} - {data?.databundle} -
                        {data?.validity}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="mt-6 px-8 pb-8 fixed bottom-0 right-0 left-0 z-10 bg-white">
            <Button
              type="submit"
              className={`w-full py-7 text-center rounded-full ${
                dataBundle
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

export default DataPage;
