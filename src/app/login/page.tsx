"use client";
import Link from "next/link";
import React, { useState } from "react";
// import Logo from "@/public/logo.png";
// import Image from "next/image";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import InputField from "@/components/forms/InputField";
import PasswordInput from "@/components/forms/PasswordInput";
// import { IoMdLock } from "react-icons/io";
import { Button } from "@/components/ui/button";
import ClipLoader from "react-spinners/ClipLoader";
import { Checkbox } from "@/components/ui/checkbox";

const validationSchema = Yup.object({
  password: Yup.string().required("Password is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const LoginPage = () => {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values: typeof initialValues) => {
    try {
      setIsLoading(true);
      await axios.post(`/api/login`, values);
      push("/dashboard");
      setIsRedirecting(true);
      if (window != undefined) {
        localStorage.setItem("userEmail", values?.email);
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid Credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center w-full h-screen bg-white">
      <div className="bg-white flex flex-col py-10 rounded-xl lg:w-4/12 md:w-5/12 w-10/12 md:px-4">
        {/* <Image src={Logo} width="200" alt="Logo" className="lg:w-40 w-[8rem]" /> */}
        <div className="mb-14 text-left">
          <h1 className="font-bold lg:text-3xl text-2xl text-black mb-2">
            Let&apos;s Sign You In
          </h1>
          <p className="font-semibold text-base text-gray-500">
            Welcome back, you&apos;ve been missed
          </p>
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}>
          {() => (
            <Form className="w-full rounded-lg">
              <InputField
                // label="Email"
                name="email"
                placeholder="Email address"
                type="email"
                ariaLabel="email"
              />
              <div className="mt-6">
                <PasswordInput
                  // label="Your Password"
                  isLogin={true}
                  name="password"
                  placeholder="Password"
                  ariaLabel="password"
                />
              </div>
              <div className="flex justify-between items-center mt-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    className="w-6 h-6 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Remember me
                  </label>
                </div>
                <Link
                  href="/forgetpassword"
                  className="lg:text-sm text-xs text-orange-400 font-semibold">
                  Forgot Password?
                </Link>
              </div>
              <div className="mt-14">
                {isRedirecting ? (
                  <Button
                    className="w-full py-7 bg-[#F9A21B] font-semibold text-zinc-800 text-sm transition-all hover:bg-[#f9a01bdd] "
                    disabled>
                    Redireacting... please wait{" "}
                  </Button>
                ) : (
                  <Button className="w-full py-7 bg-[#F9A21B] font-bold text-md transition-all hover:bg-[#f9a01bdd] ">
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <ClipLoader size={20} color="#fff" />
                        {<span className="">Loading...</span>}
                      </span>
                    ) : (
                      <>
                        <span className="font-bold">Login</span>
                      </>
                    )}
                  </Button>
                )}
              </div>
              <p className="mt-4 text-center font-semibold text-gray-600 text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-sm sm:text-sm">
                  Sign Up
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
