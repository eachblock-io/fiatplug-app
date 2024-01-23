import React from "react";
import giftcard from "@/public/cards/Greendot.png";
import Image from "next/image";
import MaxWidth from "@/components/MaxWidth";
import OfferCard from "@/components/OfferCard";
import Link from "next/link";

const GiftcardPurchase = ({}) => {
  return (
    <section className="lg:pt-10 pt-4 overflow-hidden">
      <MaxWidth>
        <div className="flex lg:flex-row flex-col-reverse gap-8">
          <div className="offers w-full mb-10">
            <div className="currencies mb-6 flex space-x-8">
                <button className="font-bold">BTC</button>
                <button className="font-bold">BTC</button>
                <button className="font-bold">BTC</button>
                <button className="font-bold">BTC</button>
            </div>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-4 gap-y-4">
              {[1, 3, 4, 5, 6, 7].map((data, i) => (
                <Link href="/" key={i}>
                  <OfferCard />
                </Link>
              ))}
            </div>
          </div>
          <div className="lg:h-60 h-40 lg:w-7/12 mx-auto relative w-full flex aspect-square items-center justify-center lg:p-6">
            <Image src={giftcard} alt="card name" priority fill />
          </div>
        </div>
      </MaxWidth>
    </section>
  );
};

export default GiftcardPurchase;
