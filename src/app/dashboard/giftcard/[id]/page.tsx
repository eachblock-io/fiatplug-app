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
    <section className="lg:pt-10 pt-4 overflow-hidden">
      <MaxWidth>
        <GiftcardBody cardInfo={cardInfo} />
        {/* <div className="flex lg:flex-row flex-col-reverse gap-8">
          <div className="offers w-full mb-10">
            <div className="currencies mb-6 flex space-x-8">
              {cardInfo?.gift_card?.attributes?.acceptable_currencies?.map(
                (data: any) => (
                  <Button variant="ghost" key={data?.id} className="font-bold">
                    {data?.attributes?.code}
                  </Button>
                )
              )}
            </div>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-4 gap-y-4">
              {cardInfo?.offers?.map((data: any) => (
                <Link href="/" key={data?.id}>
                  <GiftcardOffer data={data} />
                </Link>
              ))}
            </div>
          </div>
          <div className="lg:h-60 h-40 lg:w-7/12 mx-auto relative w-full flex aspect-square items-center justify-center lg:p-6">
            <Image
              src={cardInfo?.gift_card?.attributes?.image}
              alt={cardInfo?.gift_card?.attributes?.title}
              priority
              fill
            />
          </div>
        </div> */}
      </MaxWidth>
    </section>
  );
};

export default GiftcardPurchase;
