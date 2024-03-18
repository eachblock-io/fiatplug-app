import React from "react";
import giftcard from "@/public/cards/Greendot.png";
import Image from "next/image";
import MaxWidth from "@/components/MaxWidth";
import Link from "next/link";
import { cookies } from "next/headers";
import GiftcardBody from "@/components/GiftcardBody";
import { FaArrowLeft } from "react-icons/fa6";

async function getCard(id: string) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  // console.log(token?.value);
  const headers = {
    Authorization: `Bearer ${token?.value}`,
    "Content-Type": "application/json",
  };
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/giftcard/${id}`, {
    headers,
  });

  const cardData = await res.json();

  return cardData;
}

const GiftcardPurchase = async ({ params }: any) => {
  const cardID = params?.id;
  const cardPromise = getCard(cardID);
  const [cardData] = await Promise.all([cardPromise]);

  const cardInfo = cardData?.data;
  return (
    <section className="lg:pt-10 pt-[4rem] overflow-hidden">
      <div className="bg-[#323232] h-[7rem] text-white w-full flex items-center justify-center ">
        <div className="flex items-center mb-7 relative w-full ">
          <Link href="/dashboard/giftcard" className="text-2xl absolute left-6">
            <FaArrowLeft />
          </Link>
          <h2 className="text-center absolute right-40">{cardInfo?.gift_card?.attributes?.title}</h2>
        </div>
      </div>
      <div className="rounded-[3rem] mt-[-2.5rem] bg-white w-full">
        <MaxWidth>
          <div className="pt-6 w-11/12 mx-auto">
            <GiftcardBody cardInfo={cardInfo} />
          </div>
        </MaxWidth>
      </div>
    </section>
  );
};

export default GiftcardPurchase;
