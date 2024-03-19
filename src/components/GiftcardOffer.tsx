import React from "react";
import { Card } from "./ui/card";
import { IoIosTimer } from "react-icons/io";
import { formatCurrency } from "@/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface OfferCardProps {
  data: {
    attributes: {
      rate: number;
      max_duration: string;
      min_limit: number;
      max_limit: number;
      duration: number;
    };
    relationships: {
      merchant: {
        attributes: {
          profile_picture: string;
          full_name: string;
        };
      };
    };
  };
}

const GiftcardOffer: React.FC<OfferCardProps> = ({ data }) => {
  return (
    <Card className="lg:p-6 p-4 shadow flex items-center justify-between">
      <div className="info">
        <div className="user flex items-center">
          <Avatar className="p-0 m-0">
            <AvatarImage
              src={data?.relationships?.merchant?.attributes?.profile_picture}
            />
            <AvatarFallback className="font-bold">
              {data?.relationships?.merchant?.attributes?.full_name[0]}
            </AvatarFallback>
          </Avatar>
          <p className="text-xs ml-2">
            {data?.relationships?.merchant?.attributes?.full_name}
          </p>
        </div>
        <p className="mt-2 text-sm">
          Rate:{" "}
          <span className="font-bold text-xs">
            {formatCurrency(data?.attributes?.rate)}
          </span>
        </p>
        <p className="text-sm mt-1">
          Limit:{" "}
          <span className="font-bold text-xs">
            {formatCurrency(data?.attributes?.min_limit)} -{" "}
            {formatCurrency(data?.attributes?.max_limit)}
          </span>
        </p>
      </div>
      <div className="btn">
        <p className="flex items-center text-sm">
          <IoIosTimer /> {data?.attributes?.max_duration} mins
        </p>
        <p className="border border-orange-400 text-orange-400 py-1 px-3 text-xs my-2 rounded-md ">
          E-codes
        </p>
        <button className="w-full py-1 text-white rounded-lg text-xs px-3 bg-orange-400">
          Sell
        </button>
      </div>
    </Card>
  );
};

export default GiftcardOffer;
