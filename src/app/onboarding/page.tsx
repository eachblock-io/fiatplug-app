"use client";
import { useState } from "react";
import logoimg from "@/public/logo-dark.png";
import secureimg from "@/public/secure.png";
import sellimg from "@/public/sell.png";
import tradeimg from "@/public/trade.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const OnboradingPage = () => {
  const [currentScreen, setCurrentScreen] = useState(0);

  const handleNext = () => {
    setCurrentScreen((prev) => prev + 1);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 0:
        return (
          <div className="lg:w-6/12 w-9/12 mx-auto space-y-20 text-center">
            <div>
              <Image
                src={logoimg}
                alt="logo"
                width="200"
                height="200"
                priority
                layout="fixed"
                className="mb-10 mx-auto"
              />
              <h1 className="text-xl mb-3">Welcome to Fiatplug</h1>
              <p className="text-base">
                Top notch and secured services that helps you trade gift cards
                and sell crypto.
              </p>
            </div>
            <div>
              <Button
                onClick={handleNext}
                className="w-full mb-10 py-8 bg-[#F9A21B] font-semibold text-white text-lg transition-all hover:bg-[#f9a01bdd] ">
                Get Started
              </Button>
              <Link href="/login">
                <Button className="w-full py-8 bg-transparent border-2 border-[#F9A21B] font-semibold text-[#F9A21B] text-lg transition-all hover:bg-[#ece7df1e] ">
                  LOGIN
                </Button>
              </Link>

              <p className="mt-10 text-xs">By registering you agree to our</p>
              <p className="text-xs">
                <span className="text- underline">Terms of Conditions</span> and{" "}
                <span className="text- underline">Privacy Policy</span>
              </p>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="lg:w-6/12 w-9/12 mx-auto space-y-20 text-center">
            <div>
              <Image
                src={secureimg}
                alt="logo"
                width="300"
                height="300"
                priority
                layout="fixed"
                className="mb-10 mx-auto"
              />
              <h1 className="text-2xl mb-6 mt-6 font-extrabold">Fast & Secure</h1>
              <p className="text-base">
                Our gift card service provides you with a fast and secure way to
                purchase, send, and redeem gift cards.
              </p>
            </div>
            <div>
              <Button
                onClick={handleNext}
                className="w-full mb-2 py-8 bg-[#F9A21B] font-semibold text-white text-lg transition-all hover:bg-[#f9a01bdd] ">
                Next
              </Button>
              <Link href="/signup">
                <Button
                  variant="ghost"
                  className="w-full py-8 bg-transparent font-semibold text-lg transition-all hover:bg-[#ece7df1e] ">
                  Skip
                </Button>
              </Link>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="lg:w-6/12 w-9/12 mx-auto space-y-20 text-center">
            <div>
              <Image
                src={sellimg}
                alt="logo"
                width="300"
                height="300"
                priority
                layout="fixed"
                className="mb-10 mx-auto"
              />
              <h1 className="text-2xl mb-6 mt-6 font-extrabold">
                Buy & Sell Gift card
              </h1>
              <p className="text-base">Choose a gift card to buy or sell</p>
            </div>
            <div>
              <Button
                onClick={handleNext}
                className="w-full mb-2 py-8 bg-[#F9A21B] font-semibold text-white text-lg transition-all hover:bg-[#f9a01bdd] ">
                Next
              </Button>
              <Link href="/signup">
                <Button
                  variant="ghost"
                  className="w-full py-8 bg-transparent font-semibold text-lg transition-all hover:bg-[#ece7df1e] ">
                  Skip
                </Button>
              </Link>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="lg:w-6/12 w-9/12 mx-auto space-y-20 text-center">
            <div>
              <Image
                src={tradeimg}
                alt="logo"
                width="300"
                height="300"
                priority
                layout="fixed"
                className="mb-10 mx-auto"
              />
              <h1 className="text-2xl mb-6 mt-6 font-extrabold">
                Trade with ease{" "}
              </h1>
              <p className="text-base">
                Our trading platform lets you buy and sell cryptocurrencies with
                ease
              </p>
            </div>
            <div>
              <Link href="/signup">
                <Button className="w-full mb-2 py-8 bg-[#F9A21B] font-semibold text-white text-lg transition-all hover:bg-[#f9a01bdd] ">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="h-screen w-fill flex items-center justify-center mx-auto">
      {renderScreen()}
    </section>
  );
};

export default OnboradingPage;
