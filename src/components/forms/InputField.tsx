import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  ariaLabel: string;
}

const InputField: React.FC<InputFieldProps> = ({
  ariaLabel,
  label,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <div className="relative">
      <label
        htmlFor={props.name}
        className="absolute bg-white top-[-0.5rem] left-4 mb-1 block text-xs font-medium text-gray-500">
        {label}
      </label>
      <input
        {...field}
        {...props}
        aria-label={ariaLabel}
        className={`w-full px-4 sm:py-4 py-3 sm:text-md text-sm border border-primary rounded-sm shadow-sm text-zinc-900 bg-white focus:outline-none focus:border-main ${
          meta.touched && meta.error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-xs mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default InputField;
