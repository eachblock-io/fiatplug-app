"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import { IoIosArrowRoundBack } from "react-icons/io";
import Image from "next/image";
import { countries, passport } from "@/constant";
import KycNINModal from "@/components/KycNINModal";
import KycLicenceModal from "@/components/KycLicenceModal";

const FormSchema = z.object({
  country: z.string(),
  passport: z.string(),
});

const KYCPage = () => {
  const [open, setOpen] = useState(false);
  const [openL, setOpenL] = useState(false);
  const [openIN, setOpenIN] = useState(false);
  const [formData, setFormData] = useState({});
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setFormData(data);
    if (data?.passport == "nin") {
      setOpen(true);
    } else if (data?.passport == "driver_license") {
      setOpenL(true);
    } else {
      setOpenIN(true);
    }
  }

  return (
    <div className="lg:w-11/12 w-10/12 mx-auto mt-10">
      <Link href="/dashboard" className="text-2xl">
        <IoIosArrowRoundBack className="text-4xl" />
      </Link>
      <div className="header relative mt-8">
        <h1 className="lg:text-2xl text-2xl font-semibold mb-1 mt-4">
          Identification Verification
        </h1>
        <p className="">Enter correct information to verify account</p>
      </div>

      <div className="mt-20">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">
                    Country/region of issue
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl className="bg-gray-100 text-gray-400 p-6">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries?.map((value) => (
                        <SelectItem key={value?.flag} value={value?.name}>
                          <div className="flex items-center space-x-4">
                            <Image
                              src={value?.flagImageUrl}
                              alt={value?.name}
                              layout="fiex"
                              width="10"
                              height="10"
                              className="rounded-full w-5 h-5"
                            />
                            <p>{value?.name}</p>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passport"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">
                    Select an identity document type
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl className="bg-gray-100 text-gray-400 p-6">
                      <SelectTrigger>
                        <SelectValue placeholder="Select an identity" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {passport?.map((value) => (
                        <SelectItem key={value?.id} value={value?.kyc_type}>
                          {value?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="lg:relative fixed bottom-0 left-0 right-0 w-full pb-8 px-6 ">
              <Button
                type="submit"
                className="w-full bg-[#F9A21B] hover:bg-[#f9a01bb5] rounded-full py-8">
                Next
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <KycNINModal open={open} setOpen={setOpen} formData={formData} />
      <KycLicenceModal openL={openL} setOpenL={setOpenL} formData={formData} />
    </div>
  );
};

export default KYCPage;
