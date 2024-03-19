import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import Link from "next/link";
import Mobilenav from "@/components/Mobilenav";

const BillsPage = () => {
  return (
    <section className="h-screen w-8/12 mx-auto flex items-center justify-center relative">
      <Link href="/dashboard" className="text-2xl absolute top-20 left-0">
        <FaArrowLeft />
      </Link>
      <div>
        <h1 className="font-bold text-2xl text-center">
          Pay Bills Coming Soon 👋🚀💡
        </h1>
      </div>
      <Mobilenav />
    </section>
  );
};

export default BillsPage;
