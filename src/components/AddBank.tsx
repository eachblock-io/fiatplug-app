"use client";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import { Button } from "./ui/button";
import { FaLongArrowAltLeft } from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import fetchToken from "@/lib/auth";
import ChatPage from "./ChatPage";

const nigeriaBanks = [
  { code: "011", name: "First Bank of Nigeria" },
  { code: "033", name: "United Bank for Africa (UBA)" },
  { code: "044", name: "Access Bank" },
  { code: "063", name: "Diamond Bank (now part of Access Bank)" },
  { code: "050", name: "Ecobank Nigeria" },
  { code: "058", name: "Guaranty Trust Bank (GTBank)" },
  { code: "076", name: "Skye Bank (now Polaris Bank)" },
  { code: "084", name: "Heritage Bank" },
  { code: "023", name: "Citibank Nigeria" },
  { code: "035", name: "Wema Bank" },
  { code: "057", name: "Zenith Bank" },
  { code: "032", name: "Union Bank of Nigeria" },
  { code: "068", name: "Standard Chartered Bank" },
  { code: "214", name: "First City Monument Bank (FCMB)" },
  { code: "070", name: "Fidelity Bank" },
  { code: "082", name: "Keystone Bank" },
  { code: "215", name: "Unity Bank" },
  { code: "221", name: "Stanbic IBTC Bank" },
  { code: "302", name: "Polaris Bank" },
  { code: "304", name: "Stanford Microfinance Bank" },
  { code: "315", name: "Providus Bank" },
];

interface FormData {
  bankName: string;
  accountName: string;
  accountNumber: string;
}

const AddBankPage = ({ data, type, userData, openBank, setOpenBank }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [openChat, setOpenChat] = useState(true);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    bankName: "",
    accountName: "",
    accountNumber: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // console.log(data);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const reqData = {
      id: data?.data?.id,
      type: type,
      bank_name: formData?.bankName,
      account_name: formData?.accountName,
      account_number: formData?.accountNumber,
    };
    console.log(reqData);
    // try {
    //   const token = await fetchToken();
    //   const headers = {
    //     Authorization: `Bearer ${token?.data?.token}`,
    //     "Content-Type": "application/json",
    //   };
    //   const res = await fetch(
    //     `${process.env.NEXT_PUBLIC_API_URL}/mobile/update-transaction`,
    //     {
    //       method: "POST",
    //       headers,
    //       body: JSON.stringify(reqData),
    //     }
    //   );

    //   const resdata = await res.json();
    //   if (resdata?.status == "success") {
    //     setIsLoading(false);
    //     setIsRedirecting(true);
    //     setOpenBank(false);
    //     setOpenChat(true);
    //   }
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   setIsLoading(false);
    //   setIsRedirecting(false);
    // }
  };

  return (
    <>
      {openChat && <ChatPage userData={userData} order={data} />}
      {openBank ? (
        <div className="absolute top-0 bottom-0 right-0 left-0 w-full z-10 bg-white lg:py-20 pt-20 pb-10 lg:px-20 px-10">
          <div className="flex items-center justify-between lg:pt-4 pt-4">
            <Button
              onClick={() => setOpenBank(false)}
              variant="ghost"
              className="flex items-center">
              <FaLongArrowAltLeft className="text-xl" />
            </Button>
          </div>
          <div className="lg:w-5/12 w-12/12 mx-auto pb-10 lg:mt-10 mt-20">
            <h1 className="font-bold text-2xl">Add bank details</h1>
            <p>Input correct bank details</p>
            <form onSubmit={handleSubmit} className="space-y-6 mt-8">
              <div>
                <select
                  className="w-full p-4 rounded-lg border border-gray-400"
                  id="bank"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  required>
                  <option value="" className="text-gray-500 py-8">
                    Select a Bank
                  </option>
                  {nigeriaBanks?.map((data) => (
                    <option key={data?.code} value={data?.name}>
                      {data?.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Input
                  type="text"
                  id="accountName"
                  name="accountName"
                  value={formData.accountName}
                  onChange={handleChange}
                  required
                  placeholder="Account Name"
                  className="p-7 border border-gray-500"
                />
              </div>
              <div>
                <Input
                  type="text"
                  id="accountNumber"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  required
                  placeholder="Account Number"
                  className="p-7 border border-gray-500"
                />
              </div>
              <div className="mt-20">
                {isRedirecting ? (
                  <Button className="w-full py-7 rounded-full bg-[#F9A21B] hover:bg-[#ffb151] flex items-center px-6">
                    <span className="flex items-center justify-center gap-2">
                      <ClipLoader size={20} color="#fff" />
                      {<span className="">Redirecting... please wait</span>}
                    </span>
                  </Button>
                ) : (
                  <Button className="w-full py-7 rounded-full bg-[#F9A21B] hover:bg-[#ffb151] flex items-center px-6">
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <ClipLoader size={20} color="#fff" />
                        {<span className="">Loading...</span>}
                      </span>
                    ) : (
                      <>
                        <span className="font-bold">Sell Crypto</span>
                      </>
                    )}
                    <FaLongArrowAltRight className="ml-auto text-2xl" />
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default AddBankPage;
