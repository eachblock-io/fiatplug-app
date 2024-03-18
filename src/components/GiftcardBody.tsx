"use client";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import GiftcardOffer from "@/components/GiftcardOffer";
import Image from "next/image";

interface Offer {
  id: string;
  attributes: {
    acceptable_currencies?: Array<{
      attributes: {
        code: string;
      };
    }>;
    // Add other attributes as needed
    rate: string;
  };
}
interface OfferID {
  id: string;
  attributes: {
    acceptable_currencies?: Array<{
      id: string;
    }>;
    // Add other attributes as needed
    rate: string;
  };
}
interface Currency {
  id: string;
  attributes: {
    code: string;
  };
}

const GiftcardBody = ({ cardInfo }: any) => {
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
  const [selectedCurrencyID, setSelectedCurrencyID] = useState<string[]>([]);
  const [currencies, setCurrencies] = useState<any>([]);
  const [acceptableCurrenciesList, setAcceptableCurrenciesList] = useState<
    string[]
  >([]);

  useEffect(() => {
    // Initialize selectedCurrency with the first currency code
    if (acceptableCurrenciesList?.length > 0) {
      setSelectedCurrency(acceptableCurrenciesList[0]);
      localStorage.setItem("selectedCurrency", selectedCurrencyID[0]);
    }
  }, [acceptableCurrenciesList, selectedCurrencyID]);

  useEffect(() => {
    // Extract unique currency ID from offers and set to state
    const uniqueCurrenciesID: string[] = Array.from(
      new Set(
        cardInfo?.offers.reduce((acc: string[], offer: OfferID) => {
          const currencies = offer?.attributes?.acceptable_currencies || [];
          return acc?.concat(currencies?.map((currency) => currency?.id || ""));
        }, [])
      )
    );
    setSelectedCurrencyID(uniqueCurrenciesID);

    // Extract unique currency codes from offers and set to state
    const uniqueCurrencies: string[] = Array?.from(
      new Set(
        cardInfo?.offers?.reduce((acc: string[], offer: Offer) => {
          const currencies = offer?.attributes?.acceptable_currencies || [];
          setCurrencies(currencies);
          return acc.concat(
            currencies?.map((currency) => currency?.attributes?.code || "")
          );
        }, [])
      )
    );
    setAcceptableCurrenciesList(uniqueCurrencies);
  }, [cardInfo?.offers]);

  const handleCurrencyClick = (currencyID: string, currencyCode: string) => {
    setSelectedCurrency(currencyCode);
    localStorage?.setItem("selectedCurrency", currencyID);
  };

  const filteredOffers = cardInfo?.offers?.filter((offer: Offer) => {
    const acceptableCurrencies = offer?.attributes?.acceptable_currencies || [];
    return acceptableCurrencies.some(
      (currency) => currency?.attributes?.code === selectedCurrency
    );
  });

  return (
    <div className="flex lg:flex-row flex-col-reverse gap-8">
      {cardInfo?.length > 0 ? (
        <div className="offers w-full mb-10">
          <div className="currencies mb-6 flex lg:space-x-4 space-x-3">
            {currencies.map((currency: Currency) => {
              return (
                <Button
                  variant="ghost"
                  key={currency?.id}
                  onClick={() =>
                    handleCurrencyClick(currency?.id, currency.attributes?.code)
                  }
                  className={`font-bold lg:text-sm text-xs ${
                    selectedCurrency === currency.attributes?.code
                      ? "border-b-4 border-orange-600 rounded-none text-gray-800"
                      : ""
                  }`}>
                  {currency.attributes?.code}
                </Button>
              );
            })}
          </div>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-4 gap-y-4">
            {filteredOffers?.map((data: any) => (
              <Link
                href={`/dashboard/giftcard/sell/${data?.id}`}
                key={data?.id}>
                <GiftcardOffer data={data} />
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="pt-20 text-center">
          <p className="lg:text-4xl text-2xl">😢</p>
          <h1 className="font-semibold text-gray-500">No available offers</h1>
        </div>
      )}
      <div className="lg:h-60 h-40 lg:w-7/12 mx-auto relative w-full flex aspect-square items-center justify-center lg:p-6">
        <Image
          src={cardInfo?.gift_card?.attributes?.image}
          alt={cardInfo?.gift_card?.attributes?.title}
          priority
          fill
        />
      </div>
    </div>
  );
};

export default GiftcardBody;
