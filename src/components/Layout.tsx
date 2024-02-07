"use client";
import React from "react";
import { useState } from "react";
import { Sidenav } from "@/components/Sidenav";
import Mobilenav from "@/components/Mobilenav";
import Header from "@/components/Header";

const Layout = ({
  children,
  data,
}: {
  children: React.ReactNode | React.ReactElement;
  data: any;
}) => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <section className="flex sm:h-screen h-screen w-full overflow-hidden">
      <Sidenav data={data?.attributes} />
      <Mobilenav toggle={toggle} handleToggle={handleToggle} />
      <main className="w-full relative overflow-y-auto">
        <Header data={data?.attributes} onClick={handleToggle} />
        {children}
      </main>
    </section>
  );
};

export default Layout;
