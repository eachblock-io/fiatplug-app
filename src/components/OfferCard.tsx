import React from "react";
import { Card } from "./ui/card";
import userImg from "@/public/user.png";
import Image from "next/image";
import { IoIosTimer } from "react-icons/io";
import { Button } from "./ui/button";

const OfferCard = () => {
  return (
    <Card className="p-6 flex items-center justify-between">
      <div className="info">
        <div className="user flex items-center">
          <Image src={userImg} alt="user-image" width="200" className="w-12" />
          <p className="text-xs ml-1">John .p. Celas</p>
        </div>
        <p className="mt-2 text-sm">
          Rate: <span className="font-bold text-xs">#400</span>
        </p>
        <p className="text-sm mt-1">
          Limit: <span className="font-bold text-xs">40,000 - 90,000</span>
        </p>
      </div>
      <div className="btn">
        <p className="flex items-center text-sm">
          <IoIosTimer /> 5mins
        </p>
        <p className="border border-orange-400 text-orange-400 py-1 px-2 text-sm my-2 rounded-md ">E-codes</p>
        <Button className="w-full p-1 bg-orange-400">Sell</Button>
      </div>
    </Card>
  );
};

export default OfferCard;
