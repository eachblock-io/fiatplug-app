"use client";
import { useEffect, useState } from "react";
import { Sidenav } from "@/components/Sidenav";
import Mobilenav from "@/components/Mobilenav";
import Header from "@/components/Header";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import loaderImg from "@/public/fiatplug-loader.gif";
import fetchToken from "@/lib/auth";

interface userResponse {
  user: String | null;
  error: AxiosError | null;
}

async function getUser(): Promise<userResponse> {
  try {
    const token = await fetchToken();
    const headers = {
      Authorization: `Bearer ${token?.data?.token}`,
      "Content-Type": "application/json",
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/current-user`,
      {
        headers,
      }
    );

    const data = await res.json();

    return {
      user: data,
      error: null,
    };
  } catch (e) {
    const error = e as AxiosError;

    return {
      user: null,
      error,
    };
  }
}

const Layout = ({
  children,
}: {
  children: React.ReactNode | React.ReactElement;
}) => {
  const { push } = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    (async (async) => {
      const { user, error } = await getUser();
      setUser(user);
      if (error) {
        push("/");
        return;
      }

      setIsSuccess(true);
    })();
  }, [push]);

  if (!isSuccess) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <Image
          src={loaderImg}
          alt="loaderImg"
          width={300}
          height={300}
          layout="fixed"
        />
      </div>
    );
  }

  return (
    <section className="flex sm:h-screen h-screen w-full overflow-hidden">
      <Sidenav data={user?.attributes} />
      <Mobilenav />
      <main className="w-full relative overflow-y-auto">
        <Header data={user} />
        {children}
      </main>
    </section>
  );
};

export default Layout;
