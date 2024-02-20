import React from "react";
import { cookies } from "next/headers";
import CryptoBuyForm from "@/components/CryptoBuyForm";

async function getOffer(id: string) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const headers = {
    Authorization: `Bearer ${token?.value}`,
    "Content-Type": "application/json",
  };
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/mobile/crypto-offers/${id}`,
    {
      headers,
    }
  );

  const offer = await res.json();

  return offer;
}

export default async function CryptoOfferFormPage({ params }: any) {
  const userID = params?.id;
  const offerPromise = getOffer(userID);
  const [offer] = await Promise.all([offerPromise]);
  return (
    <section className="w-full relative flex items-center justify-center overflow-hidden">
      <CryptoBuyForm data={offer} />
    </section>
  );
}
