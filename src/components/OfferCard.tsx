import React from "react";
import { Card } from "./ui/card";
import { IoIosTimer } from "react-icons/io";
import { formatCurrency } from "@/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface OfferCardProps {
  data: {
    attributes: {
      quantity: string;
      rate: number;
      min_amount: number;
      max_amount: number;
      duration: number;
    };
    relationships: {
      user: {
        attributes: {
          profile_picture: string;
          first_name: string;
          last_name: string;
        };
      };
      merchant: {
        attributes: {
          profile_picture: string;
          first_name: string;
          last_name: string;
        };
      };
    };
  };
  isGiftcard?: boolean;
  isBuyCrypto?: boolean;
  isSellCrypto?: boolean;
}

const OfferCard: React.FC<OfferCardProps> = ({
  data,
  isBuyCrypto,
  isGiftcard,
  isSellCrypto,
}) => {
  return (
    <Card className="lg:p-6 p-4 hover:shadow-xl flex items-center justify-between">
      <div className="info">
        <div className="user flex items-center">
          {/* <Image src={userImg} alt="user-image" width="200" className="w-12" /> */}
          <Avatar className="p-0 m-0">
            <AvatarImage
              src={data?.relationships?.user?.attributes?.profile_picture}
            />
            <AvatarFallback className="font-bold">
              {data?.relationships?.user?.attributes?.first_name[0]}
              {data?.relationships?.user?.attributes?.last_name[0]}
            </AvatarFallback>
          </Avatar>
          <p className="text-xs ml-2">
            {data?.relationships?.user?.attributes?.first_name}{" "}
            {data?.relationships?.user?.attributes?.last_name}
          </p>
        </div>
        <p className="mt-2 text-sm">
          Rate:{" "}
          <span className="font-bold text-xs">
            {formatCurrency(data?.attributes?.rate)}
          </span>
        </p>
        <>
          {data?.attributes?.quantity && (
            <p className="mt-2 text-sm">
              Quantity:{" "}
              <span className="font-bold text-xs">
                {data?.attributes?.quantity}
              </span>
            </p>
          )}
        </>
        <p className="text-sm mt-1">
          Limit:{" "}
          <span className="font-bold text-xs">
            {formatCurrency(data?.attributes?.min_amount)} -{" "}
            {formatCurrency(data?.attributes?.max_amount)}
          </span>
        </p>
      </div>
      <div className="btn">
        {isGiftcard && (
          <div>
            <p className="flex items-center text-sm">
              <IoIosTimer /> {data?.attributes?.duration}mins
            </p>
            <p className="border border-orange-400 text-orange-400 py-1 px-2 text-sm my-2 rounded-md ">
              E-codes
            </p>
          </div>
        )}

        <>
          {isBuyCrypto ? (
            <>
              {isBuyCrypto ? (
                <button className="w-full py-2 text-white rounded-lg text-xs px-3 bg-orange-400">
                  Buy
                </button>
              ) : (
                <button className="w-full py-2 text-white rounded-lg text-xs px-3 bg-orange-400">
                  Sell
                </button>
              )}
            </>
          ) : (
            <button className="w-full py-2 text-white rounded-lg text-xs px-3 bg-orange-400">
              Sell
            </button>
          )}
        </>
      </div>
    </Card>
  );
};

export default OfferCard;
