"use client";
import AccountCard from "@/components/AccountCard";
import kycImg from "@/public/kyc.svg";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import RedeemModal from "@/components/RedeemModal";

const AccountPage = () => {
  const [openModal, setModal] = useState(false);

  const handleModal = () => {
    setModal(true);
  };
  return (
    <section className="lg:pt-6 pt-[5rem] lg:w-11/12 w-11/12 mx-auto">
      <div className="lg:w-8/12 w-11/12 mx-auto">
        <h1 className="font-semibold lg:text-2xl text-xl">Account</h1>
        <AccountCard openModal={setModal} />
        {/* <KycCard /> */}
        <Link
          href="/"
          className="bg-white border shadow-lg lg:p-8 p-6 flex gap-x-4 items-center justify-between rounded-[2rem] my-8 ">
          <div className="flex items-center lg:gap-x-6 gap-x-4">
            <Image src={kycImg} alt="security" />
            <p className="lg:text-lg text-sm">
              Complete verification process to continue trade
            </p>
          </div>
          <div>
            <div className="flex items-center justify-center bg-[#F9A21B] h-8 w-8 rounded-full ">
              <IoIosArrowForward className="text-white" />
            </div>
          </div>
        </Link>

        <div className="bg-white border shadow-lg lg:p-8 p-6 rounded-[2rem]">
          <h2 className="font-semibold lg:text-xl text-lg">Transaction</h2>
        </div>
      </div>
      <RedeemModal openModal={openModal} setModal={setModal} />
    </section>
  );
};

export default AccountPage;
