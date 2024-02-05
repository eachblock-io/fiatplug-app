import Link from "next/link";
import React from "react";

const OrderCard = ({ data }: any) => {
  return (
    <Link
      href={`/dashboard/orders/${data}`}
      className="border hover:bg-orange-50 flex items-center cursor-pointer justify-between shadow-md rounded-lg py-4 lg:px-10 px-5">
      <div>
        <p className="lg:text-md text-sm">
          Status: <span className="font-medium text-orange-800">Ongoing</span>
        </p>
        <p className="text-gray-500 mt-2 flex items-center gap-x-1 lg:text-md text-sm ">
          <div className="lg:w-3 w-2 lg:h-3 h-2 rounded-full bg-green-700"></div>
          Your card is being verified
        </p>
      </div>
      <div className="text-right">
        <p className="font-medium lg:text-xl text-md">AMEX</p>
        <p className="font-medium lg:text-xl text-md text-orange-500">$1000</p>
        <p className="text-gray-500 lg:text-sm text-xs">07 Feb, 2023 18:55</p>
      </div>
    </Link>
  );
};

export default OrderCard;
