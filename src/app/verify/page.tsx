"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Logo from "@/public/logo.png";
import Image from "next/image";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import InputField from "@/components/forms/InputField";
import { Button } from "@/components/ui/button";
import ClipLoader from "react-spinners/ClipLoader";
import fetchToken from "@/lib/auth";

const validationSchema = Yup.object({
  otp: Yup.string().required("OTP is required"),
});

const VerifyPage = () => {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [email, setEmail] = useState("");

  const initialValues = {
    otp: "",
  };

  useEffect(() => {
    // Check if there's an email in local storage
    const storedEmail = localStorage.getItem("userEmail");

    if (storedEmail) {
      // If there is, set the email and mark as authenticated
      setEmail(storedEmail);
    }
  }, []);

  const onSubmit = async (values: typeof initialValues) => {
    setIsLoading(true);
    try {
      const { data } = await fetchToken();

      // Set authorization header in the axios request
      const headers = {
        Authorization: `Bearer ${data?.token}`,
        "Content-Type": "application/json",
      };
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp`,
        values,
        { headers }
      );
      push("/dashboard");
      setIsRedirecting(true);
    } catch (error: any) {
      toast.error(`${error?.response?.data?.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center w-full h-screen bg-white">
      <div className="bg-white flex flex-col py-10 rounded-xl lg:w-4/12 md:w-5/12 w-10/12 md:px-4">
        <Image src={Logo} width="200" alt="Logo" className="w-40" />
        <div className="mt-10 text-left mb-4">
          <h1 className="font-bold text-2xl text-gray-700">Verification 🔐</h1>
          <p className="text-gray-500 text-md mt-2 ">
            Verification code sent to this email {`*****${email.slice(4)}`}
          </p>
        </div>

        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}>
          {() => (
            <Form className="w-full rounded-lg">
              <InputField
                label="OTP"
                name="otp"
                placeholder="Enter OTP"
                type="text"
                ariaLabel="otp"
              />
              <div className="mt-6">
                {isRedirecting ? (
                  <Button
                    className="w-full py-6 bg-[#F9A21B] font-medium text-xs transition-all hover:bg-[#f9a01bdd] "
                    disabled>
                    Prepering your dashboard... please wait{" "}
                  </Button>
                ) : (
                  <Button className="w-full py-6 bg-[#F9A21B] font-bold text-md transition-all hover:bg-[#f9a01bdd] ">
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <ClipLoader size={20} color="#fff" />
                        {<span className="">Verifying...</span>}
                      </span>
                    ) : (
                      <>
                        <span className="font-bold">Verify</span>
                      </>
                    )}
                  </Button>
                )}
              </div>
              <p className="mt-3 text-left text-sm">
                New to FiatPlug?{" "}
                <Link
                  href="/signup"
                  className="text-sm font-medium text-green-700 sm:text-sm">
                  Create an Account
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default VerifyPage;
