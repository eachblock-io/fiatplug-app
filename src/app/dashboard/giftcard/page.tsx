import MaxWidth from "@/components/MaxWidth";
import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { CiSearch } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { IoIosArrowRoundBack } from "react-icons/io";
import KycModal from "@/components/KycModal";

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
    <section className="lg:pt-10 pt-7 pb-[6rem] overflow-hidden">
      <KycModal />
      <MaxWidth>
        <div className="title">
          <Link href="/dashboard" className="text-2xl">
            <IoIosArrowRoundBack className="text-4xl" />
          </Link>
          <h1 className="lg:text-2xl text-2xl font-bold mt-6">
            Sell Gift Card
          </h1>
          <p className="mb-6 lg:mt-2 mt-1 lg:text-xl text-md text-gray-700">
            What kind of Gift card would you like to sell?
          </p>
          <div className="search-input relative flex items-center w-full lg:w-6/12 bg-[#FFFAF1] rounded-full">
            <CiSearch className="absolute left-3 text-2xl text-gray-400" />
            <input
              type="search"
              placeholder="Search for giftcard"
              className=" w-full py-4 ml-8 px-4 bg-transparent rounded-full outline-none border-none"
            />
          </div>
        </div>

        <section className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-8 gap-4 lg:mt-20 mt-10 mb-20">
          {giftcards?.data?.map((data: any) => (
            <Link key={data?.id} href={`/dashboard/giftcard/${data?.id}`}>
              <div className="p-1 bg-[#FFFAF1]">
                <Card className="lg:h-40 h-24 relative w-full rounded-lg flex aspect-square items-center justify-center lg:p-6 bg-[#FFFAF1] ">
                  <Image
                    src={data?.attributes?.image}
                    alt={data?.attributes?.title}
                    priority
                    fill
                    className="rounded-lg"
                  />
                </Card>
                <div className="p-1 text-center">
                  <p className="font-semibold lg:text-md text-sm">
                    {data?.attributes?.title}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </MaxWidth>

      <div className="mt-6 px-8 py-3 lg:relative fixed bottom-0 right-0 left-0 text-center border-none z-20 bg-white">
        <p className="mb-4">Can’t find gift card?</p>
        <Link href="/dashboard/profile/support">
          <Button className="lg:w-auto w-full py-7 text-center rounded-full bg-[#F9A21B] hover:bg-[#ffb151] px-6">
            Contact support
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default GiftcardPage;
