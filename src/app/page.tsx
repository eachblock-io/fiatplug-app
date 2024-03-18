"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import FlashScreen from "@/components/FlashScreen";

const HomePage = () => {
  const { push } = useRouter();

  useEffect(() => {
    if (window != undefined) {
      const userEmail = localStorage.getItem("userEmail");
      if (userEmail) {
        push("/login");
      } else {
        push("/onboarding");
      }
    }
  }, []);

  return (
    <>
      <FlashScreen />
    </>
  );
};

export default HomePage;
