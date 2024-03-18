import React from "react";
import logoimg from "@/public/flash-logo.png";
import Image from "next/image";

const FlashScreen = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#F9A21B]">
      <Image
        src={logoimg}
        alt="logo"
        width="200"
        height="200"
        priority
        layout="fixed"
      />
    </div>
  );
};

export default FlashScreen;
