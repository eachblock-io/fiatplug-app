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
import cookie from "cookie";

const validationSchema = Yup.object({
  password: Yup.string().required("Password is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const LoginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values: typeof initialValues) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_NEXT_API}/api/login`,
        values
      );
      console.log(response)
      setIsRedirecting(true);
    } catch (error) {
      console.log(error)
      toast.error("Invalid Credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center w-full h-screen bg-white">
      <div className="bg-white flex flex-col py-10 rounded-xl lg:w-4/12 md:w-5/12 w-10/12 md:px-4">
        <Image src={Logo} width="200" alt="Logo" className="w-40" />
        <div className="mt-10 text-left mb-4">
          <h1 className="font-bold text-2xl text-gray-700">
            Log In With Fiatplug!👋
          </h1>
        </div>
        <div className="rounded-sm p-3 flex justify-between items-center lg:flex-row md:flex-col flex-col lg:space-x-6 space-y-2 text-left mb-7 bg-green-50 border border-green-600">
          <p className="text-xs font-semibold text-gray-700 ">
            IMPORTANT! Please check that you are visiting
            https://app.fiatplug.com/
          </p>
          <p className="text-xs flex items-center mr-auto space-x-1 py-1 px-2 bg-white border border-gray-600 font-semibold">
            <IoMdLock className="text-green-600 text-lg" />
            <span className="text-green-600">https</span>://app.fiatplug.com
          </p>
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}>
          {() => (
            <Form className="w-full rounded-lg">
              <InputField
                label="Your Email"
                name="email"
                placeholder="Enter Email"
                type="email"
                ariaLabel="email"
              />
              <div className="lg:mt-8 mt-4">
                <PasswordInput
                  label="Your Password"
                  isLogin={true}
                  name="password"
                  placeholder="Password@347"
                  ariaLabel="password"
                />
              </div>
              <div className="mt-6">
                {/* <FormButton text="Login" type="submit" loading={isLoading} /> */}
                {isRedirecting ? (
                  <Button>Redireacting... please wait </Button>
                ) : (
                  <Button>{isLoading ? "Loading..." : "Login"}</Button>
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

export default LoginPage;
