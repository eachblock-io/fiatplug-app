import React from "react";
import logoimg from "@/public/flash-logo.png";
import Image from "next/image";
import { Button } from "./ui/button";

const OnBoardingFlow = () => {
  return (
    <div className="h-screen w-fill flex items-center justify-center mx-auto">
      <div className="lg:w-6/12 w-10/12">
        <Image
          src={logoimg}
          alt="logo"
          width="200"
          height="200"
          priority
          layout="fixed"
        />
        <h1>Welcome to Fiatplug</h1>
        <p>
          Top notch and secured services that helps you trade gift cards and
          sell crypto.
        </p>
        <Button className="w-full py-7 bg-[#F9A21B] font-semibold text-zinc-800 text-sm transition-all hover:bg-[#f9a01bdd] ">
          Get Started
        </Button>
        <Button className="w-full py-7 bg-[#F9A21B] font-semibold text-zinc-800 text-sm transition-all hover:bg-[#f9a01bdd] ">
          Login
        </Button>
      </div>
    </div>
  );
};

export default OnBoardingFlow;
