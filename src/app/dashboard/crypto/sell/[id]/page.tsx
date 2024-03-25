import CryptoSellForm from "@/components/CryptoSellForm";
import React from "react";
import { cookies } from "next/headers";

async function geOffer(id: string) {
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
  const offerPromise = await geOffer(userID);
  const [offer] = await Promise.all([offerPromise]);
  return (
    <>
      <section className="">
        <CryptoSellForm data={offer} />
      </section>
    </>
  );
}
