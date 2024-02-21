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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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

const FormSchema = z.object({
  bankName: z.string({
    required_error: "Please select an email to display.",
  }),
  accountName: z.string({
    required_error: "Please select an email to display.",
  }),
  accountNumber: z.string({
    required_error: "Please select an email to display.",
  }),
});

const AddBankPage = ({
  data,
  type,
  userData,
  openBank,
  setOpenBank,
  setOpenChat,
}: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const [isRedirecting, setIsRedirecting] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const handleSubmitForm = async (formdata: z.infer<typeof FormSchema>) => {
    setIsLoading(true);
    const reqData = {
      id: data?.data?.id,
      type: type,
      bank_name: formdata?.bankName,
      account_name: formdata?.accountName,
      account_number: formdata?.accountNumber,
    };
    // console.log(reqData);
    try {
      const token = await fetchToken();
      const headers = {
        Authorization: `Bearer ${token?.data?.token}`,
        "Content-Type": "application/json",
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/mobile/update-transaction`,
        {
          method: "POST",
          headers,
          body: JSON.stringify(reqData),
        }
      );

      const resdata = await res.json();
      if (resdata?.status == "success") {
        setIsLoading(false);
        setIsRedirecting(true);
        setOpenBank(false);
        setOpenChat(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsRedirecting(false);
    }
  };

  return (
    <>
      {openBank ? (
        <div className="flex items-center justify-center absolute top-0 bottom-0 right-0 left-0 w-full z-10">
          <div className=" bg-white pb-10 lg:px-20 px-10 w-full">
            <div className="mb-6">
              <Button
                onClick={() => setOpenBank(false)}
                variant="ghost"
                className="flex items-center">
                <FaLongArrowAltLeft className="text-xl" />
              </Button>
            </div>
            <div className="lg:w-5/12 w-12/12 mx-auto pb-10">
              <h1 className="font-bold lg:text-2xl text-lg">
                Add bank details
              </h1>
              <p>Input correct bank details</p>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmitForm)}
                  className="space-y-6 mt-8">
                  <div>
                    <FormField
                      control={form.control}
                      name="bankName"
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel>Bank Name</FormLabel> */}
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}>
                            <FormControl className="py-6 px-7 border border-gray-500">
                              <SelectTrigger>
                                <SelectValue placeholder="Select bank" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {nigeriaBanks?.map((data) => (
                                <SelectItem key={data?.code} value={data?.name}>
                                  {data?.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="accountName"
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel>Account Name</FormLabel> */}
                          <Input
                            type="text"
                            {...field}
                            placeholder="Account Name"
                            className="py-6 px-7 border border-gray-500"
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="accountNumber"
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel>Account Number</FormLabel> */}
                          <Input
                            type="text"
                            {...field}
                            placeholder="Account Name"
                            className="py-6 px-7 border border-gray-500"
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="pt-4">
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
              </Form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default AddBankPage;
