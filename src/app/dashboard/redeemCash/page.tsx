"use client"
import Link from "next/link";
import React, { useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import magicStar from '../../../public/magic_star_.png'
import { Button } from "@/components/ui/button";
import Image from "next/image";
import LabelInput from "@/components/forms/LabelInput";
import mtn from "@/publicmtn.png";
import airtel from "@/publicairtel.png";
import glo from "@/publicglo.png";
import mobile from "@/public9-mobile.png";
import { FaCheck } from "react-icons/fa6";
import EnterPin from "@/components/EnterPin";
import Success from "@/components/Success";

const RedeemCash = () => {
  const [openModal, setModal] = useState<boolean>(false);
  const [openSuccessModal, setSuccessModal] = useState<boolean>(false);
  const [selectedDataOption, setSelectedDataOption] = useState(null);

  const handleOptionClick = (option: any) => {
    setSelectedDataOption(option);
  };

  const handleModal = () => {
    setModal(true);
  };
  const handleSuccessModal = () => {
    setModal(false);
    setSuccessModal(true);
  };
 
  return (
    <section>
      {/* <FaArrowRight className="text-white" /> */}
      <div className="lg:w-5/12 w-12/12 mx-auto pb-10 lg:mt-10 mt-20">
        <div>
          <h1 className="text-lg font-semibold md:font-bold md:text-2xl">Airtime</h1>
          <p className="text-base font-normal text-[#6C757D]">Select a network provider</p>
        </div>

        <div className="relative flex justify-center items-center gap-8 my-10">
          <button 
            onClick={selectedDataOption === 'mtn' ? () => handleOptionClick(null) : () => handleOptionClick('mtn')} 
            className={`relative flex justify-center items-center h-20 w-20 rounded-full ${selectedDataOption === 'mtn' ? "bg-[#28B82533]" : "bg-white"} `}>
            <Image src={"/new-mtn.svg"} alt="star" className="" width={82} height={82} />
            <div className={`absolute right-0 -top-[0.6rem] justify-center items-center rounded-full h-9 w-9 bg-white -ml-3 ${selectedDataOption === 'mtn' ? "flex" : "hidden"}`}>
              <div className="flex justify-center items-center rounded-full h-7 w-7 bg-[#04DF00]">
                <FaCheck className="text-white text-xs" />
              </div>
            </div>
          </button>
          <button 
            onClick={selectedDataOption === 'glo' ? () => handleOptionClick(null) : () => handleOptionClick('glo')} 
            className={`relative flex justify-center items-center h-20 w-20 rounded-full ${selectedDataOption === 'glo' ? "bg-[#28B82533]" : "bg-white"} `}>
            <Image src={"/new-glo.svg"} alt="star" className="" width={82} height={82} />
            <div className={`absolute right-0 -top-[0.6rem] justify-center items-center rounded-full h-9 w-9 bg-white -ml-3 ${selectedDataOption === 'glo' ? "flex" : "hidden"}`}>
              <div className="flex justify-center items-center rounded-full h-7 w-7 bg-[#04DF00]">
                <FaCheck className="text-white text-xs" />
              </div>
            </div>
          </button>
          <button 
            onClick={selectedDataOption === 'airtel' ? () => handleOptionClick(null) : () => handleOptionClick('airtel')} 
            className={`relative flex justify-center items-center h-20 w-20 rounded-full ${selectedDataOption === 'airtel' ? "bg-[#28B82533]" : "bg-white"} `}>
            <Image src={"/new-airtel.svg"} alt="star" className="" width={82} height={82} />
            <div className={`absolute right-0 -top-[0.6rem] justify-center items-center rounded-full h-9 w-9 bg-white -ml-3 ${selectedDataOption === 'airtel' ? "flex" : "hidden"}`}>
              <div className="flex justify-center items-center rounded-full h-7 w-7 bg-[#04DF00]">
                <FaCheck className="text-white text-xs" />
              </div>
            </div>
          </button> 
          <button 
            onClick={selectedDataOption === 'mobile' ? () => handleOptionClick(null) : () => handleOptionClick('mobile')} 
            className={`relative flex justify-center items-center h-20 w-20 rounded-full ${selectedDataOption === 'mobile' ? "bg-[#28B82533]" : "bg-white"} `}>         
            <Image src={"/new-mobile.svg"} alt="star" className="" width={82} height={82} />
            <div className={`absolute right-0 -top-[0.6rem] justify-center items-center rounded-full h-9 w-9 bg-white -ml-3 ${selectedDataOption === 'mobile' ? "flex" : "hidden"}`}>
              <div className="flex justify-center items-center rounded-full h-7 w-7 bg-[#04DF00]">
                <FaCheck className="text-white text-xs" />
              </div>
            </div>
          </button>
        </div>

        <form className="mt-9">
          <div>
            <label htmlFor="points" className="block text-sm font-medium text-[#323232] mb-8">Enter Phone Number</label>
            <input type="number" className="w-full text-sm font-medium text-black placeholder:text-[#000000a6] outline-none border-b border-solid border-[#D9D9D9] pb-2" placeholder="704 5495 996" />
          </div>
          
          <div className="mt-11">
            <label htmlFor="points" className="block text-sm font-medium text-[#6C757D] mb-[10px]">Enter points to redeem</label>
            <div className="relative"> 
              <input
                type="number"
                id="points"
                required
                placeholder="0"
                className="py-2 w-full pl-4 border-[0.7px] border-solid border-[#000000] rounded-[10px] h-[66px] outline-none focus:outline-none text-xs font-normal text-[#1b1d21cc] placeholder:text-xs placeholder:font-medium placeholder:text-[#1B1D21]"
              />
              <span className="absolute right-4 top-0 bottom-0 flex items-center pr-2 text-sm font-medium text-[#D98400]">MAX</span>
            </div>
            <div className="flex justify-between mt-2">
              <div>
                  {/* <p>1 Points = <img src="/Group_34373.png"/>NGN600</p> */}
                  <p className="text-sm font-normal text-[#6C757D]">1 Points = NGN600</p>
              </div>
              <p className="text-sm font-normal text-[#6C757D]">Balance 550</p>
            </div>
          </div>

          <Button onClick={handleModal}
            className="relative bg-[#F9A21B] hover:bg-[#f3b456] px-4 lg:h-12 lg:text-md mt-10 rounded-full flex items-center w-full">
            {/* Text container centered */}
            <span className="w-full text-center block">Proceed</span>
            {/* Right icon aligned to the right */}
            <FaArrowRight className="text-white absolute right-4" />
          </Button>
        </form>
        <EnterPin openModal={openModal} setModal={setModal} handleSuccessModal={handleSuccessModal} />
        <Success openSuccessModal={openSuccessModal} setSuccessModal={setSuccessModal} />
      </div>
    </section>
  );
};

export default RedeemCash;
