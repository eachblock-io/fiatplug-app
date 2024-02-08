import React from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";

const OrderPage = ({ params }: any) => {
  return (
    <div className="lg:pt-10 pt-[4rem] w-full relative flex items-center justify-center mb-20">
      <div className="orders-section lg:w-8/12 w-11/12 mt-8">
        <div className="border hover:bg-orange-50 flex items-center cursor-pointer justify-between shadow-md rounded-lg py-4 lg:px-10 px-5">
          <div>
            <p className="lg:text-md text-sm">
              Status:{" "}
              <span className="font-medium text-orange-800">Ongoing</span>
            </p>
            <p className="text-gray-500 mt-2 flex items-center gap-x-1 lg:text-md text-sm ">
              <div className="lg:w-3 w-2 lg:h-3 h-2 rounded-full bg-green-700"></div>
              Your card is being verified
            </p>
          </div>
          <div className="text-right">
            <p className="font-medium lg:text-xl text-md">AMEX</p>
            <p className="font-medium lg:text-xl text-md text-orange-500">
              $1000
            </p>
            <p className="text-gray-500 lg:text-sm text-xs">
              07 Feb, 2023 18:55
            </p>
          </div>
        </div>
        <div className="steps mt-10 relative ml-14">
          <div className="line lg:border-l-8 border-l-[0.4rem] border-orange-400 lg:h-20 h-[4rem] mb-1 mt-1"></div>
          <div className="flex items-center text-orange-300">
            <p className="absolute left-[-3rem] ">6:30</p>
            <IoIosCheckmarkCircle className="lg:text-3xl text-2xl text-orange-400 absolute lg:left-[-0.7rem] left-[-0.5rem] " />
            <p className="ml-8 font-medium lg:text-sm text-xs">
              Your card has been received
            </p>
          </div>
          <div className="line lg:border-l-8 border-l-[0.4rem] border-orange-400 lg:h-20 h-[4rem] mb-1 mt-1"></div>
          <div className="flex items-center text-orange-300">
            <p className="absolute left-[-3rem] ">6:30</p>
            <IoIosCheckmarkCircle className="lg:text-3xl text-2xl text-orange-400 absolute lg:left-[-0.7rem] left-[-0.5rem] " />
            <p className="ml-8 font-medium lg:text-sm text-xs">
              Your card is being verified
            </p>
          </div>

          <div className="line lg:border-l-8 border-l-[0.4rem] border-orange-400 lg:h-20 h-[4rem] mb-1 mt-1"></div>
          <div className="flex items-center text-orange-300">
            <p className="absolute left-[-3rem] ">6:30</p>
            <IoIosCheckmarkCircle className="lg:text-3xl text-2xl text-orange-400 absolute lg:left-[-0.7rem] left-[-0.5rem] " />
            <p className="ml-8 font-medium lg:text-sm text-xs">
              Your card has been verified
            </p>
          </div>

          <div className="line lg:border-l-8 border-l-[0.4rem] border-orange-400 lg:h-20 h-[4rem] mb-1 mt-1"></div>
          <div className="flex items-center text-orange-300">
            <p className="absolute left-[-3rem] ">6:30</p>
            <IoIosCheckmarkCircle className="lg:text-3xl text-2xl text-orange-400 absolute lg:left-[-0.7rem] left-[-0.5rem] " />
            <p className="ml-8 font-medium lg:text-sm text-xs">
              Payment has been successfully sent as instructed
            </p>
          </div>
          <div className="line lg:border-l-8 border-l-[0.4rem] border-orange-400 lg:h-20 h-[4rem] mb-1 mt-1"></div>
          <div className="flex items-center text-orange-300">
            <p className="absolute left-[-3rem] ">6:30</p>
            <IoIosCheckmarkCircle className="lg:text-3xl text-2xl text-orange-400 absolute lg:left-[-0.7rem] left-[-0.5rem] " />
            <p className="ml-8 font-medium lg:text-sm text-xs">
              Payment confirmed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
