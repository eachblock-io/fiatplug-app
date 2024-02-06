"use client";
import { useState } from "react";
import Image from "next/image";
import rechargeImg from "@/public/GivingRupiahcoin.png";
import payImg from "@/public/List.png";
import giftcardImg from "@/public/creditCard.png";
import { CardCarousel } from "@/components/ui/CardCarousel";
import Link from "next/link";
import { CryptoCarousel } from "@/components/ui/CryptoCarousel";
import OfferCard from "@/components/OfferCard";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { handleOpen } from "@/redux/features/toggleSlice";
import fetchToken from "@/lib/auth";
import ClipLoader from "react-spinners/ClipLoader";

const HomeScreen = ({ data, sellOffers, buyOffers }: any) => {
  const dispatch = useAppDispatch();
  const active = useAppSelector((state) => state.toggle.value);
  const [isActive, setIsActive] = useState(true);
  const [currentBuyOffers, setCurrentBuyOffers] = useState(buyOffers?.offers);
  const [currentSellOffers, setCurrentSellOffers] = useState(
    sellOffers?.offers
  );
  const [activeCurr, setActiveCurr] = useState(buyOffers?.currencies[0]?.id);
  const [activeSellCurr, setActiveSellCurr] = useState(
    sellOffers?.currencies[0]?.id
  );
  const [loading, setLoading] = useState(false);

  const handleToggle = () => {
    dispatch(handleOpen());
  };

  const buyandsell = () => {
    setIsActive(!isActive);
  };

  // Fetch sell offers
  const handleFetchSellOffers = async (id: any) => {
    setActiveSellCurr(id);
    try {
      setLoading(true);
      const data = await fetchToken();
      const headers = {
        Authorization: `Bearer ${data?.data?.token}`,
        "Content-Type": "application/json",
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/mobile/crypto-offers?filter[is_sell]=1&filter[currency_id]=${id}`,
        {
          headers,
        }
      );

      const buyOffers = await res.json();
      setCurrentSellOffers(buyOffers?.data?.offers);
    } catch {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // Fetch buy offers
  const handleFetchBuyOffers = async (id: any) => {
    setActiveCurr(id);
    try {
      setLoading(true);
      const data = await fetchToken();
      const headers = {
        Authorization: `Bearer ${data?.data?.token}`,
        "Content-Type": "application/json",
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/mobile/crypto-offers?filter[is_buy]=1&filter[currency_id]=${id}`,
        {
          headers,
        }
      );

      const buyOffers = await res.json();
      setCurrentBuyOffers(buyOffers?.data?.offers);
    } catch {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full px-4 mx-auto">
        {active ? <CardCarousel cards={data} /> : <CryptoCarousel />}{" "}
      </div>
      <section className="w-full lg:my-20 my-6">
        <div className="tabs mb-4 rounded-md border lg:w-11/12 w-full mx-auto grid grid-cols-2 gap-2 p-2 bg-gray-100">
          <button
            onClick={handleToggle}
            className={`${
              active
                ? `bg-white shadow-md text-gray-700`
                : `bg-gray-100 text-gray-500`
            } lg:p-3 p-2 font-semibold rounded-md lg:text-lg text-sm w-full`}>
            Gift Cards
          </button>
          <button
            onClick={handleToggle}
            className={`${
              !active
                ? `bg-white shadow-md text-gray-700`
                : `bg-gray-100 text-gray-500`
            } lg:p-3 p-2 font-semibold rounded-md lg:text-lg text-sm w-full`}>
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
                  href="/dashboard/giftcard"
                  className="card-bg relative overflow-hidden rounded-[2rem] ">
                  <div className=" lg:p-10 p-4 text-white ">
                    <h2 className="font-bold lg:text-3xl text-lg">
                      Redeem Gift Card
                    </h2>
                    <p className="text-md mt-2 lg:text-lg text-sm">
                      Sell gifts card fast and easy
                    </p>
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
                    className="recharge-card lg:p-8 p-4 rounded-[2rem] bg-[#FFE3F1] hover:bg-[#f0c0d8] transition-all lg:pr-20 flex items-center justify-between lg:flex-row flex-col-reverse">
                    <div>
                      <h2 className="font-bold lg:text-3xl text-lg text-gray-700 ">
                        Recharge
                      </h2>
                      <p className="lg:text-md mt-2 text-gray-500 lg:text-lg text-xs">
                        Recharge airtime and buy data
                      </p>
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
                    className="bills-card lg:p-8 p-4 rounded-[2rem] bg-[#DAF2FF] hover:bg-[#abdbf3] transition-all lg:pr-20 flex items-center justify-between lg:flex-row flex-col-reverse">
                    <div className="w-full">
                      <h2 className="font-bold lg:text-3xl text-md text-gray-700 ">
                        Pay Bills
                      </h2>
                      <p className="text-md mt-2 text-gray-500 lg:text-lg text-xs">
                        Pay bills at ease
                      </p>
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
            <div className="lg:pt-6 pt-4">
              <div className="toggle lg:mb-10 mb-6 space-x-6">
                <button
                  onClick={buyandsell}
                  className={`py-3 text-sm px-10 font-semibold rounded-full ${
                    isActive
                      ? `text-[#F9A21B] bg-[#FFF4E2]`
                      : `text-zinc-900 bg-gray-100`
                  }`}>
                  Buy
                </button>
                <button
                  onClick={buyandsell}
                  className={`py-3 text-sm px-10 font-semibold rounded-full ${
                    !isActive
                      ? `text-[#F9A21B] bg-[#FFF4E2]`
                      : `text-zinc-900 bg-gray-100`
                  }`}>
                  Sell
                </button>
              </div>
              {isActive ? (
                <div>
                  {/* Buy Currencies list */}
                  <div className="flex items-center lg:space-x-10 space-x-4 mb-6">
                    {buyOffers?.currencies?.map((data: any) => (
                      <button
                        key={data?.id}
                        onClick={() => handleFetchBuyOffers(data?.id)}
                        className={`font-bold text-gray-600 lg:text-md text-sm ${
                          activeCurr === data?.id &&
                          `border-b border-orange-500`
                        }`}>
                        {data?.attributes?.symbol}
                      </button>
                    ))}
                  </div>
                  <h1 className="font-bold lg:text-2xl text-lg mb-4 lg:mt-10">
                    Available offers
                  </h1>
                  <>
                    {loading ? (
                      <div className="text-center pt-10">
                        <ClipLoader size={40} color="#F9A21B" />
                        <h2 className="font-semibold">Loading...</h2>
                      </div>
                    ) : (
                      <>
                        {currentBuyOffers?.length > 0 ? (
                          <div className="grid lg:grid-cols-3 grid-cols-1 gap-x-4 gap-y-4">
                            {currentBuyOffers?.map((data: any) => (
                              <Link
                                href={`/dashboard/crypto/buy/${data?.id}`}
                                key={data?.id}>
                                <OfferCard data={data} />
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <div className="py-10 text-center">
                            <p className="lg:text-4xl text-2xl">😢</p>
                            <h1 className="font-semibold text-gray-500">
                              No available offers
                            </h1>
                          </div>
                        )}
                      </>
                    )}
                  </>
                </div>
              ) : (
                <div>
                  {/*  Sell Currency */}
                  <div className="flex items-center lg:space-x-10 space-x-4 mb-6">
                    {sellOffers?.currencies?.map((data: any) => (
                      <button
                        key={data?.id}
                        onClick={() => handleFetchSellOffers(data?.id)}
                        className={`font-bold text-gray-600 lg:text-md text-sm ${
                          activeSellCurr === data?.id &&
                          `border-b border-orange-500`
                        }`}>
                        {data?.attributes?.symbol}
                      </button>
                    ))}
                  </div>
                  <h1 className="font-bold lg:text-2xl text-lg mb-4 mt-10">
                    Available offers
                  </h1>
                  <>
                    {loading ? (
                      <div className="text-center pt-10">
                        <ClipLoader size={40} color="#F9A21B" />
                        <h2 className="font-semibold">Loading...</h2>
                      </div>
                    ) : (
                      <>
                        {currentSellOffers?.length > 0 ? (
                          <div className="grid lg:grid-cols-3 grid-cols-1 gap-x-4 gap-y-4">
                            {currentSellOffers?.map((data: any) => (
                              <Link
                                href={`/dashboard/crypto/sell/${data?.id}`}
                                key={data?.id}>
                                <OfferCard data={data} />
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <div className="py-10 text-center">
                            <p className="lg:text-4xl">😢</p>
                            <h1 className="font-semibold text-gray-500">
                              No available offers
                            </h1>
                          </div>
                        )}
                      </>
                    )}
                  </>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default HomeScreen;
