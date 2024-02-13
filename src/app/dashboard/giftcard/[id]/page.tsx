import React from "react";
import giftcard from "@/public/cards/Greendot.png";
import Image from "next/image";
import MaxWidth from "@/components/MaxWidth";
import OfferCard from "@/components/OfferCard";
import Link from "next/link";
import { cookies } from "next/headers";
import GiftcardOffer from "@/components/GiftcardOffer";
import { Button } from "@/components/ui/button";
import GiftcardBody from "@/components/GiftcardBody";

async function getCard(id: string) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
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
    <section className="lg:pt-10 pt-[6rem] overflow-hidden">
      <MaxWidth>
        <GiftcardBody cardInfo={cardInfo} />
      </MaxWidth>
    </section>
  );
};

export default GiftcardPurchase;
