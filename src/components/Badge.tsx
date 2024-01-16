import Link from 'next/link';
import React from 'react'
import cardBadge from "@/public/cardBadge.png"
import Image from 'next/image';

const Badge = () => {
  return (
    <div className="bg-green-50 relative overflow-hidden flex justify-between lg:flex-row flex-col-reverse lg:p-10 p-6 pb-20 rounded-md text-left border border-green-700">
      <div className="content">
        <h1 className="lg:mb-10 mb-6 font-bold lg:text-4xl text-xl">
          Get Best Giftcard & Crypto Rate on Fiatplug
        </h1>
        <Link
          href="/"
          className="border-2 border-green-700 rounded-full px-10 lg:py-3 py-2 text-green-700">
          Learn more
        </Link>
      </div>
      <div className="img w-full flex items-end justify-end">
        <Image
          src={cardBadge}
          width="480"
          alt="card badge"
          className="absolute bottom-[-1rem] right-[-2rem] lg:w-auto w-60 "
        />
      </div>
    </div>
  );
}

export default Badge
