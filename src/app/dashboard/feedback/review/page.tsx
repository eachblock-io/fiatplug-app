"use client";
import { useState, useEffect } from "react";
import fetchToken from "@/lib/auth";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import ReviewForm from "@/components/ReviewForm";

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

const ReviewPage = () => {
  const { push } = useRouter();
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    (async (async) => {
      const { user, error } = await getUser();
      setUser(user);
      if (error) {
        push("/");
        return;
      }

      if (window != undefined) {
        localStorage.setItem("userData", JSON.stringify(user));
      }
    })();
  }, [push]);
  return (
    <div className="w-10/12 mx-auto">
      <div className="flex mt-20">
        <div className="flex space-x-4 lg:hidden">
          <Avatar className="p-0 m-0">
            <AvatarImage src={user?.attributes?.profile_picture} />
            <AvatarFallback className="font-bold">
              {user?.attributes?.first_name[0]}
              {user?.attributes?.last_name[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-base font-bold">
              {user?.attributes?.first_name} {user?.attributes?.last_name}
            </p>
            <p className="text-xs mt-1">
              Reviews are public and includes your account name. Your opinion
              help us improve our P2P service.
            </p>
          </div>
        </div>
      </div>
    <ReviewForm />
    </div>
  );
};

export default ReviewPage;
