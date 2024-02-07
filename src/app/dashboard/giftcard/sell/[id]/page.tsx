import React from 'react'
import GiftcardSellForm from '@/components/GiftcardSellForm'
import { cookies } from "next/headers";

async function geOffer(id: string) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const headers = {
    Authorization: `Bearer ${token?.value}`,
    "Content-Type": "application/json",
  };
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/offers/${id}`,
    {
      headers,
    }
  );

  const offer = await res.json();

  return offer;
}

const SellGiftcardPage = async ({ params }: any) => {
  const userID = params?.id;
  const offerPromise = geOffer(userID);
  const [offer] = await Promise.all([offerPromise]);

  console.log(offer);
  
  return (
    <div>
      <GiftcardSellForm data={offer} />
    </div>
  );
};

export default SellGiftcardPage