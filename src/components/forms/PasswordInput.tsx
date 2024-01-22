import React, { InputHTMLAttributes, useState } from "react";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2"; // You can import appropriate icons from react-icons
import { useField } from "formik";
import Link from "next/link";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  ariaLabel: string;
  forgotPassword?: boolean;
  isLogin?: boolean;
}

const PasswordInput: React.FC<InputFieldProps> = ({
  ariaLabel,
  label,
  isLogin,
  ...props
}: any) => {
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrengthMessage, setPasswordStrengthMessage] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validatePasswordStrength = (password: string) => {
    // Implement your password strength validation logic here
    if (password.length < 8) {
      setPasswordStrengthMessage(
        "Weak: Password must be at least 8 characters long."
      );
    } else if (password.length < 12) {
      setPasswordStrengthMessage("Moderate: Password could be stronger.");
    } else {
      setPasswordStrengthMessage(
        "Strong: Password meets strength requirements."
      );
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    validatePasswordStrength(newPassword);
    field.onChange(e);
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center">
        <label
          htmlFor={props.name}
          className="block font-medium text-sm mb-2 text-gray-500">
          {label}
        </label>
        {isLogin && (
          <Link href="/signup" className="text-sm font-medium text-green-700">
            Forgot Password?
          </Link>
        )}
      </div>
      <div className="relative">
        <input
          {...field}
          {...props}
          type={showPassword ? "text" : "password"}
          aria-label={ariaLabel}
          className={`w-full px-4 sm:py-3 py-3 sm:text-md text-sm border border-primary rounded-sm shadow-sm text-zinc-900 bg-transparent focus:outline-none focus:border-main ${
            meta.touched && meta.error ? "border-red-500" : "border-gray-300"
          }`}
          onChange={handlePasswordChange}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600"
          onClick={togglePasswordVisibility}>
          {showPassword ? (
            <HiOutlineEye className="text-xl" />
          ) : (
            <HiOutlineEyeSlash className="text-xl" />
          )}
        </button>
      </div>
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-xs mt-1">{meta.error}</div>
      ) : (
        passwordStrengthMessage && (
          <div
            className={`${
              passwordStrengthMessage.includes("Strong")
                ? "text-green-500"
                : "text-red-500"
            } text-xs mt-1`}>
            {passwordStrengthMessage}
          </div>
        )
      )}
    </div>
  );
};

export default PasswordInput;
