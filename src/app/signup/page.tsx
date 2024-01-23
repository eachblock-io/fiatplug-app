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
      await axios.post(`${process.env.NEXT_PUBLIC_NEXT_API}/api/register`, {
        first_name: values?.first_name,
        last_name: values?.last_name,
        email: values?.email,
        password: values?.password,
        password_confirmation: values?.password,
        referralCode: values?.referralCode,
      });
      localStorage.setItem("userEmail", values?.email);
      localStorage.setItem("userName", values?.first_name);
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
        <Image src={Logo} width="150" alt="Logo" className="lg:w-40 w-24" />
        <div className="mt-6 text-left mb-4">
          <h1 className="font-bold lg:text-2xl text-lg text-gray-700">
            Sign Up With Fiatplug!👋
          </h1>
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}>
          {() => (
            <Form className="w-full rounded-lg">
              <div className="mb-2 grid lg:grid-cols-2 grid-cols-1 lg:gap-x-4 gap-y-2">
                <InputField
                  label="Your First Name"
                  name="first_name"
                  placeholder="Enter First Name"
                  type="text"
                  ariaLabel="firstname"
                />
                <InputField
                  label="Your Last Name"
                  name="last_name"
                  placeholder="Enter Last Name"
                  type="text"
                  ariaLabel="lastname"
                />
              </div>
              <InputField
                label="Your Email"
                name="email"
                placeholder="Enter Email"
                type="email"
                ariaLabel="email"
              />
              <div className="mt-4">
                <PasswordInput
                  label="Your Password"
                  name="password"
                  placeholder="Password@347"
                  ariaLabel="password"
                />
              </div>
              <InputField
                hidden
                name="password_confirmation"
                type="password"
                ariaLabel="password_confirmation"
              />
              <div className="mb-4">
                <InputField
                  label="Referral Code"
                  name="referralCode"
                  placeholder="Referral code"
                  type="text"
                  ariaLabel="referralCode"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" required />
                <label
                  htmlFor="terms"
                  className="lg:text-sm text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  By creating an account, you agree to our{" "}
                  <Link href="/" className="text-[#f94f1b] font-bold">
                    Term and Conditions
                  </Link>
                </label>
              </div>
              <div className="mt-6">
                {isRedirecting ? (
                  <Button
                    className="w-full lg:py-6 bg-[#F9A21B] font-bold lg:text-md transition-all hover:bg-[#f9a01bdd] "
                    disabled>
                    Creating your account... please wait{" "}
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="w-full lg:py-6 bg-[#F9A21B] font-bold lg:text-md transition-all hover:bg-[#f9a01bdd] ">
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <ClipLoader size={20} color="#fff" />
                        {<span className="">Loading...</span>}
                      </span>
                    ) : (
                      <>
                        <span className="font-bold">Create account</span>
                      </>
                    )}
                  </Button>
                )}
              </div>
              <p className="mt-3 text-left text-sm">
                Already on FiatPlug?{" "}
                <Link
                  href="/"
                  className="text-sm font-semibold text-green-700 sm:text-sm">
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
