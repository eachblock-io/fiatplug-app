import React from "react";
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
  return (
    <section className="flex sm:h-screen h-screen w-full overflow-hidden">
      <Sidenav data={data?.attributes} />
      <Mobilenav />
      <main className="w-full relative overflow-y-auto">
        <Header data={data} />
        {children}
      </main>
    </section>
  );
};

export default Layout;
