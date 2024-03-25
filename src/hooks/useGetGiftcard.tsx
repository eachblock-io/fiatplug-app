"use client";
import { useEffect, useState } from "react";
import fetchToken from "@/lib/auth";

interface OfferType {
  offers: any[];
  currencies: any[];
}

// Define your hook
const useGiftcardData = () => {
  const [giftcardData, setGiftcardData] = useState<OfferType>({
    offers: [],
    currencies: [],
  });
  const [giftcardLoading, setGiftcardLoading] = useState(true);

  useEffect(() => {
    const fetchBuyOffers = async () => {
      try {
        const token = await fetchToken();
        const headers = {
          Authorization: `Bearer ${token?.data?.token}`,
          "Content-Type": "application/json",
        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/giftcard`, {
          headers,
        });

        if (!res.ok) {
          throw new Error("Failed to fetch gift cards");
        }

        const giftcardData = await res.json();
        setGiftcardData(giftcardData);
        setGiftcardLoading(false);
      } catch (error) {
        console.error("Error fetching gift cards:", error);
        setGiftcardLoading(false);
      }
    };

    fetchBuyOffers();

    // Cleanup function (optional)
    return () => {
      // Any cleanup code can go here
    };
  }, []); // Empty dependency array ensures the effect runs only once

  return { giftcardData, giftcardLoading };
};

export default useGiftcardData;
