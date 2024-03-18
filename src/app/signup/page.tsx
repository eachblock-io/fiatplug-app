"use client";
import Link from "next/link";
import React, { useState } from "react";
import Logo from "@/public/logo.png";
import Image from "next/image";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import InputField from "@/components/forms/InputField";
import PasswordInput from "@/components/forms/PasswordInput";
import FormButton from "@/components/forms/FormButton";
import { IoMdLock } from "react-icons/io";
import { Button } from "@/components/ui/button";
import ClipLoader from "react-spinners/ClipLoader";
import { Checkbox } from "@/components/ui/checkbox";

const validationSchema = Yup.object({
  first_name: Yup.string().required("Firstname is required"),
  last_name: Yup.string().required("Lastname is required"),
  password: Yup.string().required("Password is required"),
  password_confirmation: Yup.string(),
  referralCode: Yup.string(),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const LoginPage = () => {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    referralCode: "",
  };

  const onSubmit = async (values: typeof initialValues) => {
    setIsLoading(true);
    try {
      await axios.post(`/api/register`, {
        first_name: values?.first_name,
        last_name: values?.last_name,
        email: values?.email,
        password: values?.password,
        password_confirmation: values?.password,
        referralCode: values?.referralCode,
      });
      if (window != undefined) {
        localStorage.setItem("userEmail", values?.email);
        localStorage.setItem("userName", values?.first_name);
      }
      
      push("/verify");
      setIsRedirecting(true);
    } catch (error) {
      toast.error("Invalid Credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center w-full h-screen bg-white">
      <div className="bg-white flex flex-col py-10 rounded-xl lg:w-4/12 md:w-5/12 w-10/12 md:px-4">
        {/* <Image src={Logo} width="150" alt="Logo" className="lg:w-40 w-[8rem]" /> */}
        <div className="mb-14 text-left">
          <h1 className="font-bold lg:text-3xl text-2xl text-black mb-2">
            Getting Started
          </h1>
          <p className="font-semibold text-base text-gray-500">
            Seems you are new here, let&apos;s set up your profile
          </p>
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}>
          {() => (
            <Form className="w-full rounded-lg">
              <div className="mb-6 grid lg:grid-cols-2 grid-cols-2 lg:gap-x-4 gap-y-6 gap-x-3">
                <InputField
                  // label="First Name"
                  name="first_name"
                  placeholder="First name"
                  type="text"
                  ariaLabel="firstname"
                />
                <InputField
                  // label="Last Name"
                  name="last_name"
                  placeholder="Last Name"
                  type="text"
                  ariaLabel="lastname"
                />
              </div>
              <InputField
                // label="Email"
                name="email"
                placeholder="Email address"
                type="email"
                ariaLabel="email"
              />
              <div className="mt-6">
                <PasswordInput
                  // label="Password"
                  name="password"
                  placeholder="Password"
                  ariaLabel="password"
                />
              </div>
              <InputField
                hidden
                name="password_confirmation"
                type="password"
                ariaLabel="password_confirmation"
              />
              <div className="my-6">
                <InputField
                  // label="Referral Code"
                  name="referralCode"
                  placeholder="Referral code"
                  type="text"
                  ariaLabel="referralCode"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" className="w-6 h-6" required />
                <label
                  htmlFor="terms"
                  className="lg:text-sm text-xs font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-col">
                  <span>By creating an account, you agree to our </span>
                  <Link href="/" className="text-[#f94f1b] font-bold">
                    Term and Conditions
                  </Link>
                </label>
              </div>
              <div className="mt-6">
                {isRedirecting ? (
                  <Button
                    className="w-full py-7 bg-[#F9A21B] font-bold lg:text-md transition-all hover:bg-[#f9a01bdd] "
                    disabled>
                    Creating your account... please wait{" "}
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="w-full py-7 bg-[#F9A21B] font-bold lg:text-md transition-all hover:bg-[#f9a01bdd] ">
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <ClipLoader size={20} color="#fff" />
                        {<span className="">Loading...</span>}
                      </span>
                    ) : (
                      <>
                        <span className="font-bold">Continue</span>
                      </>
                    )}
                  </Button>
                )}
              </div>
              <p className="mt-4 text-center font-semibold text-sm">
                Already have an account?{" "}
                <Link href="/" className="text-sm font-semibold sm:text-sm">
                  Login
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default LoginPage;
