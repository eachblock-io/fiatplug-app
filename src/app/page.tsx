"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FlashScreen from "@/components/FlashScreen";

const HomePage = () => {
  const { push } = useRouter();
  const [firstTime, setFirstTime] = useState<any>("" || null);

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
