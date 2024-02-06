"use client";
import { useState } from "react";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import coinImg from "@/public/coin.png";
import Image from "next/image";
import { Button } from "./ui/button";

const AccountCard = ({ openModal }: any) => {
  const [active, setActive] = useState(false);
  const handleToggle = () => {
    setActive(!active);
  };

  return (
    <div className="card bg-gray-800 text-white lg:p-8 p-6 rounded-xl lg:mt-10 mt-6 ">
      <div className="flex items-center justify-between">
        <p className="lg:text-xl text-md">Availble Balance</p>
        <div className="lg:h-10 h-8 lg:w-10 w-8 rounded-full bg-gray-500 flex items-center justify-center">
          {active ? (
            <IoMdEye onClick={handleToggle} className="lg:text-2xl text-xl" />
          ) : (
            <IoMdEyeOff
              onClick={handleToggle}
              className="lg:text-2xl text-xl"
            />
          )}
        </div>
      </div>
      <div className="balance text-center lg:mt-6 mt-4">
        {active ? (
          <div>
            <h1 className="flex items-center justify-center space-x-2 lg:text-4xl text-2xl font-bold">
              <Image
                src={coinImg}
                alt="coins"
                width="20"
                height="20"
                layout="fixed"
              />{" "}
              <span>500</span>
            </h1>
            <div className="lg:mt-2 mt-1 items-center">
              <p> = 30,000 NGN</p>
            </div>
          </div>
        ) : (
          <p className="font-bold text-xl">*********</p>
        )}
        <Button
          onClick={() => openModal(true)}
          className="bg-[#F9A21B] hover:bg-[#f3b456] px-14 lg:h-12 lg:text-md mt-4">
          Redeem points
        </Button>
      </div>
    </div>
  );
};

export default AccountCard;
