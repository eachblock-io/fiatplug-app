"use client";
import { useEffect, useState } from "react";
import { Sidenav } from "@/components/Sidenav";
import Mobilenav from "@/components/Mobilenav";
import Header from "@/components/Header";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

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


interface userResponse {
  user: String | null;
  error: AxiosError | null;
}


const Layout = ({
  children,
  data,
}: {
  children: React.ReactNode | React.ReactElement;
  data: any;
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
