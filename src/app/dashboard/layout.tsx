"use client";
import { useEffect, useState } from "react";
import "../globals.css";
import Layout from "@/components/Layout";
import { Providers } from "@/redux/providers";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import loaderImg from "@/public/fiatplug-loader.gif";

interface userResponse {
  user: String | null;
  error: AxiosError | null;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    return <div className="flex items-center justify-center h-screen w-full">
      <Image src={loaderImg} alt="loaderImg" width={300} height={300} layout="fixed" />
    </div>;
  }

  return (
    <Providers>
      <main>
        <Layout data={user}>{children}</Layout>
      </main>
    </Providers>
  );
}

async function getUser(): Promise<userResponse> {
  try {
    const { data } = await axios.get("/api/me");

    return {
      user: data?.user,
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
