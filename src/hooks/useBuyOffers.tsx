"use client";
import { useEffect, useState } from "react";
import fetchToken from "@/lib/auth";

interface OfferType {
  offers: any[];
  currencies: any[];
}

// Define your hook
const useBuyOffers = () => {
  const [buyOffers, setBuyOffers] = useState<OfferType>({
    offers: [],
    currencies: [],
  });
  const [buyLoading, setBuyLoading] = useState(true);

  useEffect(() => {
    const fetchBuyOffers = async () => {
      try {
        const token = await fetchToken();
        const headers = {
          Authorization: `Bearer ${token?.data?.token}`,
          "Content-Type": "application/json",
        };
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/mobile/crypto-offers?filter[is_buy]=1`,
          {
            headers,
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch buy offers");
        }

        const buyOffersData = await res.json();
        setBuyOffers(buyOffersData?.data);
        setBuyLoading(false);
      } catch (error) {
        console.error("Error fetching buy offers:", error);
        setBuyLoading(false);
      }
    };

    fetchBuyOffers();

    // Cleanup function (optional)
    return () => {
      // Any cleanup code can go here
    };
  }, []); // Empty dependency array ensures the effect runs only once

  return { buyOffers, buyLoading };
};

export default useBuyOffers;
