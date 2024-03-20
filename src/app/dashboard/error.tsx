"use client";
import Header from "@/components/Header";
import Mobilenav from "@/components/Mobilenav";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="h-screen flex items-center justify-center bg-orange-50">
      <Header />
      <div className="text-center w-10/12 mx-auto space-y-8">
        {error?.message == "fetch failed" ? (
          <p className="font-semibold">Network Error</p>
        ) : (
          <p className="font-semibold">There was a problem</p>
        )}
        <p>Please try again or contact support if the problem persists.</p>
        <div className="space-x-8">
          <Button className="hover:bg-orange-400 bg-orange-500" onClick={reset}>
            Try again
          </Button>
          <Link href="/dashboard">
            {" "}
            <Button
              className="bg-transparent text-orange-500 border border-orange-500"
              onClick={reset}>
              Go back home
            </Button>
          </Link>
        </div>
      </div>
      {/* <Mobilenav /> */}
    </div>
  );
}
