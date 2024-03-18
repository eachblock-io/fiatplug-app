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
    <div>
      An error occured: {error?.message}{" "}
      <Button className="hover:bg-orange-400 bg-orange-500" onClick={reset}>
        Try again
      </Button>
    </div>
  );
}
