"use client";
import { useState } from "react";
import Link from "next/link";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useRouter } from "next/navigation";

const RechargePage = () => {
  const { push } = useRouter();
  const [selectedOption, setSelectedOption] = useState(null || String);

  const handleSaveAirtime = () => {
    setSelectedOption("airtime");
  };

  const handleSaveData = () => {
    setSelectedOption("data");
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (selectedOption) {
      if (window != undefined) {
        localStorage.setItem("billing_type", selectedOption);
        if (selectedOption === "data") {
          push("/dashboard/recharge/data");
        } else if (selectedOption === "airtime") {
          push("/dashboard/recharge/airtime");
        }
      }
    } else {
      alert("Please select an option before submitting.");
    }
  };

  return (
    <section className="h-screen w-10/12 mx-auto relative mt-20">
      <Link href="/dashboard" className="text-2xl">
        <IoIosArrowRoundBack className="absolute left-0 top-0 text-4xl" />
      </Link>
      <div className="pt-20">
        <h1 className="font-bold lg:text-2xl text-2xl">
          Choose a purchase option
        </h1>
        <p>Select your preferred recharge option</p>
        <form onSubmit={handleSubmit} className="form mt-20">
          <RadioGroup className="space-y-6">
            <Label
              htmlFor="airtime"
              className="flex items-center space-x-2 border border-gray-400 p-4 rounded-lg">
              <RadioGroupItem
                value="airtime"
                onClick={handleSaveAirtime}
                id="airtime"
              />
              <p className="text-gray-500">Mobile Airtime </p>
            </Label>
            <Label
              htmlFor="data"
              className="flex items-center space-x-2 border border-gray-400 p-4 rounded-lg">
              <RadioGroupItem value="data" onClick={handleSaveData} id="data" />
              <p className="text-gray-500">Mobile Data</p>
            </Label>
          </RadioGroup>
          <div className="mt-6 px-8 pb-8 fixed bottom-0 right-0 left-0 z-10 bg-white">
            <Button
              type="submit"
              className={`w-full py-7 text-center rounded-full ${
                selectedOption
                  ? "bg-[#F9A21B] hover:bg-[#ffb151]"
                  : "bg-[#f9a01b9c] cursor-not-allowed"
              } px-6`}
              disabled={!selectedOption}>
              <div className="text-center mx-auto w-full">
                <div className="text-center">
                  <span className="font-semibold">Continue</span>
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

export default RechargePage;
