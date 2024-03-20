import { formatTime } from "@/lib/utils";
import { dateFormaterAndTime, formatCurrency } from "@/utils";
import Link from "next/link";
import React from "react";

const OrderCard = ({ data, onOrderClick }: any) => {
  const handleOrderClick = () => {
    onOrderClick(data);
  };

  return (
    <>
      {!data?.is_crypto ? (
        <div
          onClick={handleOrderClick}
          className="border hover:bg-orange-50 flex items-center cursor-pointer justify-between shadow-md rounded-lg py-4 lg:px-10 px-5">
          <div>
            <p className="lg:text-md text-sm mt-4">
              Status:{" "}
              <span className="font-medium capitalize text-orange-800">
                {data?.display_data?.status}
              </span>
            </p>
            <p className="text-gray-500 mt-2 flex items-center gap-x-1 lg:text-md text-xs ">
              <div className="lg:w-3 w-2 lg:h-3 h-2 rounded-full bg-green-700"></div>
              Your card is being received
            </p>
            {data?.other_details?.card_received && (
              <p className="text-gray-500 mt-2 flex items-center gap-x-1 lg:text-md text-sm ">
                <div className="lg:w-3 w-2 lg:h-3 h-2 rounded-full bg-green-700"></div>
                Your card is being received
              </p>
            )}
            {data?.other_details?.card_verified && (
              <p className="text-gray-500 mt-2 flex items-center gap-x-1 lg:text-md text-sm ">
                <div className="lg:w-3 w-2 lg:h-3 h-2 rounded-full bg-green-700"></div>
                Your card is being verified
              </p>
            )}
            {data?.other_details?.payment_sent && (
              <p className="text-gray-500 mt-2 flex items-center gap-x-1 lg:text-md text-sm ">
                <div className="lg:w-3 w-2 lg:h-3 h-2 rounded-full bg-green-700"></div>
                Your payment is being sent
              </p>
            )}
            {data?.other_details?.payment_received && (
              <p className="text-gray-500 mt-2 flex items-center gap-x-1 lg:text-md text-sm ">
                <div className="lg:w-3 w-2 lg:h-3 h-2 rounded-full bg-green-700"></div>
                Your payment is being received
              </p>
            )}
          </div>
          <div className="text-right">
            <p className="font-medium lg:text-xl text-sm">
              {data?.display_data?.deal}
            </p>
            <p className="font-medium lg:text-xl text-sm text-orange-500">
              ${formatCurrency(data?.display_data?.amount)}
            </p>
            <p className="text-gray-500 text-xs">
              {dateFormaterAndTime(data?.other_details?.created_at)},{" "}
              {formatTime(data?.other_details?.created_at)}
            </p>
          </div>
        </div>
      ) : (
        <div
          onClick={handleOrderClick}
          className="border hover:bg-orange-100 flex items-center cursor-pointer justify-between shadow-md rounded-lg py-4 lg:px-10 px-5">
          <div>
            <span className="bg-gray-300 py-2 px-4 rounded-full text-center text-xs">
              Crypto
            </span>
            <p className="lg:text-md text-sm mt-2">
              Status:{" "}
              <span className="font-medium capitalize text-orange-800">
                {data?.display_data?.status}
              </span>
            </p>
          </div>
          <div className="text-right">
            <p className="font-medium lg:text-xl text-sm">
              {data?.display_data?.deal}
            </p>
            <p className="font-medium lg:text-xl text-sm text-orange-500">
              {formatCurrency(data?.display_data?.amount)}
            </p>
            <p className="text-gray-500 text-xs">
              {dateFormaterAndTime(data?.other_details?.created_at)},{" "}
              {formatTime(data?.other_details?.created_at)}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderCard;
