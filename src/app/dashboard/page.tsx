import HomeScreen from "@/components/HomeScreen";
import MaxWidth from "@/components/MaxWidth";
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

// Buy Offers
async function getBuyOffers() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const headers = {
    Authorization: `Bearer ${token?.value}`,
    "Content-Type": "application/json",
  };
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/mobile/crypto-offers?filter[is_buy]=1`,
    {
      headers,
    }
  );

  const buyOffers = await res.json();

  return buyOffers;
}

// Sell Offers
async function getSellOffers() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const headers = {
    Authorization: `Bearer ${token?.value}`,
    "Content-Type": "application/json",
  };
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/mobile/crypto-offers?filter[is_sell]=1`,
    {
      headers,
    }
  );

  const buyOffers = await res.json();

  return buyOffers;
}

export default async function AccountPage() {
  const giftcardsPromise = getGiftcard();
  const buyOffersPromise = getBuyOffers();
  const sellOffersPromise = getSellOffers();

  const [giftcards, sellOffers, buyOffers] = await Promise.all([
    giftcardsPromise,
    buyOffersPromise,
    sellOffersPromise,
  ]);

  return (
    <section className="lg:pt-10 pt-[6rem] pb-40 lg:pb-20 overflow-hidden">
      <MaxWidth>
        <HomeScreen
          data={giftcards}
          sellOffers={sellOffers?.data}
          buyOffers={buyOffers?.data}
        />
      </MaxWidth>
    </section>
  );
}
