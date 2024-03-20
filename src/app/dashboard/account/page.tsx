import AccountCard from "@/components/AccountCard";
import kycImg from "@/public/kyc.svg";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { cookies } from "next/headers";
import Mobilenav from "@/components/Mobilenav";
import Header from "@/components/Header";
import emptytran from "@/public/empty-trans.png";
import VerifedCard from "@/components/VerifedCard";

async function getPoint() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const headers = {
    Authorization: `Bearer ${token?.value}`,
    "Content-Type": "application/json",
  };
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/mobile/my-earned-points`,
    {
      headers,
    }
  );

  const points = await res.json();

  return points?.data?.display_data;
}

const AccountPage = async () => {
  const points = await getPoint();
  return (
    <>
      <Header />
      <section className="lg:pt-6 pt-[5rem] lg:w-11/12 w-11/12 mx-auto ">
        <div className="lg:w-8/12 w-11/12 mx-auto">
          {/* <h1 className="font-semibold lg:text-2xl text-xl">Account</h1> */}
          <AccountCard data={points} />

          {/* <KycCard /> */}
          <VerifedCard />
          <div className="border shadow-lg lg:p-8 p-6 rounded-[2rem] bg-white mt-6">
            <h2 className="font-semibold lg:text-xl text-lg">Transaction</h2>
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <Image
                  src={emptytran}
                  alt="No transaction"
                  layout="fixed"
                  width="130"
                  height="130"
                  className="mx-auto"
                />
                <p className="text-xs text-gray-400 mt-2">
                  You don’t have any transaction
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Mobilenav />
    </>
  );
};

export default AccountPage;
