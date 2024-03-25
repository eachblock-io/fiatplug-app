import Header from "@/components/Header";
import HomeScreen from "@/components/HomeScreen";
import MaxWidth from "@/components/MaxWidth";
import Mobilenav from "@/components/Mobilenav";
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

export default async function AccountPage() {
  const giftcardsPromise = getGiftcard();

  const [giftcards] = await Promise.all([giftcardsPromise]);

  return (
    <>
      <div className="lg:hidden flex">
        <Header />
      </div>
      <section className="lg:pt-10 pt-[5rem] pb-20 lg:pb-20 overflow-hidden">
        <MaxWidth>
          <HomeScreen data={giftcards} />
          {/* <HomeScreenClone data={giftcards} /> */}
        </MaxWidth>
      </section>
      <Mobilenav />
    </>
  );
}
