import MaxWidth from "@/components/MaxWidth";
import React from "react";
import { Card } from "@/components/ui/card";
import giftcard from "@/public/cards/Greendot.png";
import amazoncard from "@/public/cards/Amazon.jpg";
import steamcard from "@/public/cards/steam.jpg";
import RazorGoldcard from "@/public/cards/RazorGold.png";
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";

async function getGiftcard() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const headers = {
    Authorization: `Bearer ${token?.value}`,
    "Content-Type": "application/json",
  };
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/giftcard`, {
    headers,
  });

  const user = await res.json();

  return user;
}

const GiftcardPage = async () => {
  const giftcardsPromise = getGiftcard();

  const [giftcards] = await Promise.all([giftcardsPromise]);
  return (
    <section className="lg:pt-10 pt-[6rem] overflow-hidden">
      <MaxWidth>
        <div className="title">
          <h1 className="lg:text-2xl text-xl font-semibold">Sell Gift Card</h1>
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

        <section className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-8 gap-x-2 lg:mt-20 my-10">
          {giftcards?.data?.map((data: any) => (
            <Link key={data?.id} href={`/dashboard/giftcard/${data?.id}`}>
              <div className="p-1">
                <Card className="lg:h-40 h-24 relative w-full rounded-lg flex aspect-square items-center justify-center lg:p-6">
                  <Image
                    src={data?.attributes?.image}
                    alt={data?.attributes?.title}
                    priority
                    fill
                  />
                </Card>
                <div className="p-1">
                  <p className="font-semibold lg:text-md text-sm">
                    {data?.attributes?.title}
                  </p>
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
