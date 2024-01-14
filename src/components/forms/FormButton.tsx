import { cn } from "@/lib/utils";
import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

interface ButtonProps {
  type: any;
  text: string;
  loading?: boolean;
  loadingTxt?: boolean;
  className?: string;
}

const FormButton = ({
  type,
  text,
  loadingTxt,
  loading,
  className,
}: ButtonProps) => (
  <button
    type={type}
    className={cn(
      "w-full py-2 font-bold text-white transition duration-300 rounded-md bg-zinc-900 sm:py-3",
      className
    )}>
    {loading ? (
      <span className="flex items-center justify-center gap-2">
        <ClipLoader size={20} color="#fff" />
        {!loadingTxt && <span className="">Loading...</span>}
      </span>
    ) : (
      <>
        <span className="font-bold">{text}</span>
      </>
    )}
  </button>
);

export default FormButton;
