"use client";
import { Button } from "@/components/ui/button";
import React from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        {error?.message == "fetch failed" ? (
          <p>Network Error</p>
        ) : (
          <p>An error occured: {error?.message} </p>
        )}
        <Button className="hover:bg-orange-400 bg-orange-500" onClick={reset}>
          Try again
        </Button>
      </div>
    </div>
  );
}
