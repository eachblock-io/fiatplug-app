import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import Link from "next/link";

const RechargePage = () => {
  return (
    <section className="h-screen w-8/12 mx-auto flex items-center justify-center relative">
      <Link href="/dashboard" className="text-2xl absolute left-0 top-20">
        <FaArrowLeft />
      </Link>
      <div>
        <h1 className="font-bold text-2xl text-center">
          Recharge Coming Soon 👋🚀💡
        </h1>
      </div>
    </section>
  );
};

export default RechargePage;
