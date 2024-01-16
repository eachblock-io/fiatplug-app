"use client";
import React from "react";
// import { Header, HeaderMobile, SideNav, MobileSideNav } from "./";
import { useState } from "react";
import { Sidenav } from "@/components/Sidenav";
import Mobilenav from "@/components/Mobilenav";
import Header from "@/components/Header";

const Layout = ({
  children,
}: {
  children: React.ReactNode | React.ReactElement;
}) => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <section className="flex sm:h-screen h-full w-full overflow-hidden">
      <Sidenav />
      <Mobilenav toggle={toggle} handleToggle={handleToggle} />
      <main className="w-full relative overflow-y-auto">
        <Header onClick={handleToggle} />
        {children}
      </main>
    </section>
  );
};

export default Layout;
