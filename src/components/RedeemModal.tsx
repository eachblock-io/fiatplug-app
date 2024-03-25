import Link from "next/link";
import React from "react";
import { IoCloseCircleSharp } from "react-icons/io5";

const RedeemModal = ({ openModal, setModal }: any) => {
  return (
    <>
      {openModal ? (
        <div className="flex items-center text-black justify-center absolute top-0 bottom-0 right-0 left-0 h-screen w-full z-10 bg-black bg-opacity-75 lg:py-4 pb-10 lg:px-20 px-6">
          <div className="bg-white lg:w-6/12 w-12/12 rounded-[1rem] relative cursor-pointer ">
            <IoCloseCircleSharp
              onClick={() => setModal(false)}
              className="absolute top-4 right-4 text-2xl text-white"
            />
            <div className="bg-[#F09303] lg:px-14 px-10 lg:py-6 py-8 rounded-[1rem] text-white">
              <h2 className="font-bold lg:text-2xl text-xl">Redeem points</h2>
              <p className="lg:text-lg text-xs">
                Choose your preferred redeem method
              </p>
            </div>
            <div className="bg-white pt-8 pb-16 lg:px-14 px-10 rounded-[1rem]">
              <div className="mb-16">
                <Link href="/dashboard/account/redeem" className="mb-20">
                  <h2 className="font-semibold lg:text-xl text-lg">
                    Redeem to Airtime 📲{" "}
                  </h2>
                  <p className="text-sm">
                    Instantly redeem points as airtime to your phone.
                  </p>
                  {/* <p className="text-orange-600 text-xs mt-2">
                    Min. Points: 200
                  </p> */}
                </Link>
              </div>
              <Link href="/dashboard/account/cash">
                <h2 className="font-semibold lg:text-xl text-lg">
                  Redeem to Cash 💸
                </h2>
                <p className="text-sm">
                  Instantly redeem points directly to your bank account.
                </p>
                {/* <p className="text-orange-600 text-xs mt-2">Min. Points: 500</p> */}
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default RedeemModal;
