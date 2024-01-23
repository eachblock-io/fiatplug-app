import MaxWidth from "@/components/MaxWidth";
import React from "react";
import { Card } from "@/components/ui/card";
import giftcard from "@/public/cards/Greendot.png";
import amazoncard from "@/public/cards/Amazon.jpg";
import steamcard from "@/public/cards/steam.jpg";
import RazorGoldcard from "@/public/cards/RazorGold.png";
import Image from "next/image";
import Link from "next/link";

const cardsData = [
  {
    id: 1,
    name: "Greendot",
    img: giftcard,
  },
  {
    id: 2,
    name: "Amazon",
    img: amazoncard,
  },
  {
    id: 3,
    name: "Steam",
    img: steamcard,
  },
  {
    id: 4,
    name: "Razor Gold",
    img: RazorGoldcard,
  },
];

const GiftcardPage = () => {
  return (
    <section className="lg:pt-10 pt-4 overflow-hidden">
      <MaxWidth>
        <div className="title">
          <h1 className="lg:text-4xl text-2xl font-bold">Sell Gift Card</h1>
          <p className="mb-6 lg:mt-2 mt-1 lg:text-xl text-md text-gray-500">
            What kind of Gift card would you like to sell?
          </p>
          <div className="search-input relative w-full lg:w-6/12 border border-gray-600 rounded-full">
            <input
              type="search"
              placeholder="Search for giftcard"
              className=" w-full lg:py-4 py-3 px-4 rounded-full outline-none"
            />
          </div>
        </div>

        <section className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-8 gap-x-2 lg:mt-20 mt-10">
          {cardsData?.map((data) => (
            <Link key={data?.id} href={`/account/giftcard/${data?.id}`}>
              <div className="p-1">
                <Card className="lg:h-40 h-24 relative w-full rounded-lg flex aspect-square items-center justify-center lg:p-6">
                  <Image src={data?.img} alt={data?.name} priority fill />
                </Card>
                <div className="p-1">
                  <p className="font-semibold lg:text-md text-sm">{data?.name}</p>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </MaxWidth>
    </section>
  );
};

export default GiftcardPage;