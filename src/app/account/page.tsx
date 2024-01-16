import Badge from "@/components/Badge";
import MaxWidth from "@/components/MaxWidth";
import { Button } from "@/components/ui/button";
import React from "react";
import CardImg from "@/public/creditCard.png";
import CryptoImg from "@/public/crypto-card.png";
import Image from "next/image";
import rechargeImg from "@/public/GivingRupiahcoin.png";
import payImg from "@/public/List.png";
import giftcardImg from "@/public/creditCard.png";
import { CardCarousel } from "@/components/ui/CardCarousel";
import PageTab from "@/components/PageTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

const AccountPage = () => {
  return (
    <section className="lg:pt-10 pt-4">
      <MaxWidth>
        {/* <Badge /> */}
        {/* <section className="grid lg:grid-cols-2 grid-cols-1 gap-10 my-10">
          <div className="giftcard-card overflow-hidden flex justify-between lg:flex-row flex-col-reverse space-x-3 relative items-center shadow-lg border rounded-md w-full">
            <div className="content p-6">
              <h2 className="lg:text-2xl text-3xl font-bold ">
                Redeem GiftCard For Cash
              </h2>
              <Button className="mt-8 px-10 lg:py-7 text-md rounded-full bg-[#F9A21B] text-white ">
                Redeem Your Giftcard
              </Button>
            </div>
            <Image
              src={cardBadge}
              alt="gift-card image"
              width="200"
              className="rotate-[-90deg] w-80 relative lg:absolute right-[-5rem] "
            />
          </div>

          <div className="crypto-card bg-green-50 overflow-hidden flex justify-between lg:flex-row flex-col-reverse space-x-6 relative items-center border border-green-900 shadow-xlg rounded-md pl-8 lg:pb-0 w-full">
            <div className="content p-6">
              <h2 className="lg:text-4xl text-3xl font-bold text-white ">
                Easily purchase crypto in minutes!
              </h2>
              <Button className="mt-8 lg:px-16 px-8 lg:py-7 text-xl bg-[#F9A21B] text-white ">
                Buy /Sell Giftcard
              </Button>
            </div>
          </div>
        </section> */}

        {/*===============
         Card slider
         =================== */}
        <CardCarousel />
        <section className="w-full lg:my-20 my-10">
          <Tabs defaultValue="account" className="lg:w-11/12 w-full mx-auto ">
            <TabsList className="w-full py-8 border">
              <TabsTrigger
                value="account"
                className="w-full text-lg font-semibold py-3">
                Gift Cards
              </TabsTrigger>
              <TabsTrigger
                value="password"
                className="w-full text-lg font-semibold py-3">
                Crypto
              </TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="lg:pt-10 pt-4">
              <h2 className="font-bold lg:text-3xl text-2xl text-gray-700 mb-4">Function</h2>
              <div className="grid lg:grid-cols-2 grid-cols-2 lg:gap-10 gap-4">
                <Link
                  href="/"
                  className="card-bg relative overflow-hidden rounded-md">
                  <div className=" lg:p-8 p-4 text-white">
                    <h2 className="font-bold lg:text-4xl text-xl lg:mt-10 mt-4">
                      Redeem Gift Card
                    </h2>
                    <p className="text-md mt-2 lg:text-lg text-md">
                      Sell gifts card fast and easy
                    </p>
                    <Image
                      src={giftcardImg}
                      alt="recharge card"
                      width="200"
                      className="lg:w-[300px] w-[150px] absolute left-0 bottom-[0rem] "
                    />
                  </div>
                </Link>
                <div className="flex flex-col lg:gap-10 gap-4">
                  <Link
                    href="/"
                    className="recharge-card px:p-6 p-4 rounded-md bg-[#FFE3F1] hover:bg-[#f0c0d8] transition-all lg:pr-20">
                    <Image
                      src={rechargeImg}
                      alt="recharge card"
                      width="200"
                      className="lg:w-[130px] w-[80px] ml-auto"
                    />
                    <h2 className="font-bold lg:text-4xl text-xl ">Recharge</h2>
                    <p className="text-md mt-2 lg:text-lg text-md">
                      Recharge airtime and buy data
                    </p>
                  </Link>
                  <Link
                    href="/"
                    className="bills-card lg:p-8 p-4 rounded-md bg-[#DAF2FF] hover:bg-[#abdbf3] transition-all lg:pr-20">
                    <Image
                      src={payImg}
                      alt="recharge card"
                      width="200"
                      className="lg:w-[130px] w-[80px] ml-auto "
                    />
                    <h2 className="font-bold lg:text-4xl text-xl">Pay Bills</h2>
                    <p className="text-md mt-2 lg:text-lg text-md">
                      Pay bills at ease
                    </p>
                  </Link>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="password">
              Change your password here.
            </TabsContent>
          </Tabs>
        </section>
      </MaxWidth>
    </section>
  );
};

export default AccountPage;
