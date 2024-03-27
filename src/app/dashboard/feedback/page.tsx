import React from "react";
import Image from "next/image";
import bankImg from "@/public/bank.png";
import notgoodIcon from "@/public/notgoodicon.png";
import greatIcon from "@/public/greeticon.png";
import { FaCheck } from "react-icons/fa6";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const FeedbackFlow = () => {
  return (
    <div className="h-screen fixed top-0 bottom-0 left-0 right-0 z-20 bg-white">
      <div className="w-10/12 mx-auto mt-20">
        <div className="relative mx-auto">
          <div className="bg-gray-300 h-20 w-20 mx-auto rounded-full flex items-center justify-center">
            <Image
              src={bankImg}
              alt="bank-image"
              width="30"
              height="30"
              layout="fixed"
            />
          </div>
          <div className="bg-green-600 h-20 w-20 absolute right-20 top-6 border-4 border-white mx-auto rounded-full flex items-center justify-center">
            <FaCheck className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="text-center mt-20">
          <h2 className="mt-8 font-bold text-2xl">Succesful!!</h2>
          {/* <p className="text-base mt-2">
            You just redeemed 300 Points for NGN75,000 cash, You will be
            credited within 24hours
          </p> */}

          <div className="shadow-xl rounded-xl border mt-20 text-center">
            <div className="p-6 border-b ">
              <h3 className="font-bold text-lg">Rate your experience.</h3>
              <p>Hi there! We’d love to know if you had a great experience.</p>
            </div>
            <div className="grid grid-cols-2">
              <Link href="/dashboard/feedback/review">
                <div className="not-good text-center p-8 border-r cursor-pointer">
                  <Image
                    src={notgoodIcon}
                    alt="bank-image"
                    width="40"
                    height="40"
                    layout="fixed"
                    className="mx-auto"
                  />
                  <p className="font-bold mt-3 text-[#007AFF] text-lg">
                    Not Good
                  </p>
                </div>
              </Link>
              <Link href="/dashboard/feedback/review">
                <div className="great text-center p-8 cursor-pointer">
                  <Image
                    src={greatIcon}
                    alt="bank-image"
                    width="40"
                    height="40"
                    layout="fixed"
                    className="mx-auto"
                  />
                  <p className="font-bold mt-3 text-[#007AFF] text-lg">
                    Great!
                  </p>
                </div>
              </Link>
            </div>
          </div>

          <div className="mt-6 px-8 pb-8 fixed bottom-0 right-0 left-0 z-10 bg-white">
            <Link href="/dashboard">
              <Button className="relative bg-[#F9A21B] hover:bg-[#f3b456] px-4 py-7 lg:text-md mt-4 rounded-full flex items-center w-8/12 mx-auto">
                Back to home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackFlow;
