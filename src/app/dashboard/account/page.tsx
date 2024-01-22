"use client";
import MaxWidth from "@/components/MaxWidth";
import { useState } from "react";
import Image from "next/image";
import rechargeImg from "@/public/GivingRupiahcoin.png";
import payImg from "@/public/List.png";
import giftcardImg from "@/public/creditCard.png";
import { CardCarousel } from "@/components/ui/CardCarousel";
import Link from "next/link";
import { CryptoCarousel } from "@/components/ui/CryptoCarousel";
import OfferCard from "@/components/OfferCard";

const AccountPage = () => {
  const [active, setActive] = useState(true);
  const handleToggle = () => {
    setActive(!active);
    console.log("Hello");
  };
  return (
    <section className="lg:pt-10 pt-4 overflow-hidden">
      <MaxWidth>
        {/*===============
         Card slider
         =================== */}
        {active ? <CardCarousel /> : <CryptoCarousel />}
        <section className="w-full lg:my-20 my-6">
          <div className="tabs mb-4 rounded-md border lg:w-11/12 w-full mx-auto grid grid-cols-2 gap-2 p-2 bg-gray-100">
            <button
              onClick={handleToggle}
              className={`${
                active ? `bg-white text-gray-700` : `bg-gray-100 text-gray-500`
              } p-3 font-semibold rounded-md w-full`}>
              Gift Cards
            </button>
            <button
              onClick={handleToggle}
              className={`${
                !active ? `bg-white text-gray-700` : `bg-gray-100 text-gray-500`
              } p-3 font-semibold rounded-md w-full`}>
              Crypto
            </button>
          </div>
          <div className="lg:w-11/12 w-full mx-auto ">
            {active && (
              <div className="lg:pt-10 pt-4">
                <h2 className="font-bold lg:text-3xl text-2xl text-gray-700 mb-4">
                  Function
                </h2>
                <div className="grid lg:grid-cols-2 grid-cols-2 lg:gap-10 gap-2">
                  <Link
                    href="/account/giftcard"
                    className="card-bg relative overflow-hidden rounded-md">
                    <div className=" lg:p-8 p-4 text-white">
                      <h2 className="font-bold lg:text-4xl text-lg">
                        Redeem Gift Card
                      </h2>
                      <p className="text-md mt-2 lg:text-lg text-sm">
                        Sell gifts card fast and easy
                      </p>
                      <button className="lg:text-md text-xs mt-4 w-auto lg:px-14 px-5 lg:py-4 py-3 rounded-sm bg-white text-gray-900 font-semibold ">
                        Redeem giftcard
                      </button>
                      <Image
                        src={giftcardImg}
                        alt="recharge card"
                        width="200"
                        className="lg:w-[180px] w-[100px] absolute left-0 bottom-[0rem] "
                      />
                    </div>
                  </Link>
                  <div className="flex flex-col lg:gap-10 gap-2">
                    <Link
                      href="/"
                      className="recharge-card lg:p-8 p-4 rounded-md bg-[#FFE3F1] hover:bg-[#f0c0d8] transition-all lg:pr-20 flex items-center justify-between lg:flex-row flex-col-reverse">
                      <div>
                        <h2 className="font-bold lg:text-4xl text-lg text-gray-700 ">
                          Recharge
                        </h2>
                        <p className="lg:text-md mt-1 lg:text-lg text-xs">
                          Recharge airtime and buy data
                        </p>
                        <button className="lg:text-md text-xs lg:mt-4 mt-2 lg:w-auto lg:px-14 px-6 lg:py-4 py-3 rounded-sm bg-[#e99c03] text-gray-100 font-semibold whitespace-nowrap ">
                          Recharge airtime
                        </button>
                      </div>
                      <Image
                        src={rechargeImg}
                        alt="recharge card"
                        width="200"
                        className="lg:w-[100px] w-[40px] ml-auto"
                      />
                    </Link>
                    <Link
                      href="/"
                      className="bills-card lg:p-8 p-4 rounded-md bg-[#DAF2FF] hover:bg-[#abdbf3] transition-all lg:pr-20 flex items-center justify-between lg:flex-row flex-col-reverse">
                      <div className="w-full">
                        <h2 className="font-bold lg:text-4xl text-md text-gray-700 ">
                          Pay Bills
                        </h2>
                        <p className="text-md mt-1 lg:text-lg text-xs">
                          Pay bills at ease
                        </p>
                        <button className="lg:text-md w-full text-xs lg:mt-4 mt-2 lg:w-auto lg:px-14 px-6 lg:py-4 py-3 rounded-sm bg-[#e99c03] text-gray-100 font-semibold whitespace-nowrap ">
                          Pay Bills
                        </button>
                      </div>
                      <Image
                        src={payImg}
                        alt="recharge card"
                        width="200"
                        className="lg:w-[100px] w-[40px] ml-auto "
                      />
                    </Link>
                  </div>
                </div>
              </div>
            )}
            {!active && (
              <div className="lg:pt-10 pt-4">
                <div className="grid lg:grid-cols-3 grid-cols-1 gap-x-4 gap-y-4">
                  {[1, 3, 4, 5, 6, 7].map((data, i) => (
                    <Link href="/" key={i}>
                      <OfferCard />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </MaxWidth>
    </section>
  );
};

export default AccountPage;
