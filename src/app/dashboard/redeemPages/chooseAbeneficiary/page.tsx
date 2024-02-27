"use client";
import Link from "next/link";
import { RiBankLine } from "react-icons/ri";

const chooseAbeneficiary = () => {
  return (
    <section className=" lg:w-11/12 w-11/12 mx-auto mt-6">
      <div className="lg:w-8/12 w-11/12 mx-auto">
        {/* <h1 className="font-bold lg:text-2xl">Account</h1> */}
        <div className="my-8 ">
            <input className="lg:text-lg text-sm md:pl-[44px] bg-white outline-none border-none w-full shadow-bank-details p-2 lg:p-4 flex gap-x-4 items-center justify-between rounded-[10px]" placeholder="Start typing to filter....." />
        </div>

        <Link href="/dashboard/redeemPages/redeemPoints/">
          <div className="bg-white shadow-bank-details lg:p-8 p-6 rounded-[2rem] mb-5">
            <div className="p-2  rounded-lg flex gap-[15px] items-center">
              <div className="flex justify-center items-center rounded-full h-[34px] w-[34px] bg-[#28B825]">
                <RiBankLine className=" text-white w-[19px] h-[17px]" />
              </div>

              <div>
                <p className="text-sm font-medium text-black">Jams, Ethan Hunt</p>
                <span className="text-xs font-normal text-[#00000099]">2023434318 | Opay</span>
              </div>
            </div>
          </div>
        </Link>

        <div className="bg-white shadow-bank-details lg:p-8 p-6 rounded-[2rem]">
          <div className="p-2  rounded-lg flex gap-[15px] items-center">
            <div className="flex justify-center items-center rounded-full h-[34px] w-[34px] bg-[#28B825]">
              <RiBankLine className=" text-white w-[19px] h-[17px]" />
            </div>

            <div>
              <p className="text-sm font-medium text-black">Jams, Ethan Hunt</p>
              <span className="text-xs font-normal text-[#00000099]">2023434318 | Opay</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default chooseAbeneficiary;
