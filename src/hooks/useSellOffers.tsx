"use client";
import { useEffect, useState } from "react";
import fetchToken from "@/lib/auth";

interface OfferType {
  offers: any[];
  currencies: any[];
}

// Define your hook
const useSellOffers = () => {
  const [sellOffers, setSellOffers] = useState<OfferType>({
    offers: [],
    currencies: [],
  });
  const [sellLoading, setSellLoading] = useState(true);

  useEffect(() => {
    const fetchSellOffers = async () => {
      try {
        const token = await fetchToken();
        const headers = {
          Authorization: `Bearer ${token?.data?.token}`,
          "Content-Type": "application/json",
        };
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/mobile/crypto-offers?filter[is_sell]=1`,
          {
            headers,
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch Sell offers");
        }

        const sellOffersData = await res.json();
        setSellOffers(sellOffersData?.data);
        setSellLoading(false);
      } catch (error) {
        console.error("Error fetching Sell offers:", error);
        setSellLoading(false);
      }
    };

    fetchSellOffers();

    // Cleanup function (optional)
    return () => {
      // Any cleanup code can go here
    };
  }, []); // Empty dependency array ensures the effect runs only once

  return { sellOffers, sellLoading };
};

export default useSellOffers;
