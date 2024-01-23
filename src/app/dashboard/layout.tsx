"use client";
import { useEffect, useState } from "react";
import "../globals.css";
import Layout from "@/components/Layout";
import { Providers } from "@/redux/providers";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

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

  useEffect(() => {
    (async (async) => {
      const { user, error } = await getUser();
      if (error) {
        push("/");
        return;
      }

      setIsSuccess(true);
    })();
  }, [push]);

  if (!isSuccess) {
    return <p>Loading...</p>;
  }

  return (
    <Providers>
      <main>
        <Layout>{children}</Layout>
      </main>
    </Providers>
  );
}

async function getUser(): Promise<userResponse> {
  try {
    const { data } = await axios.get("/api/me");

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
