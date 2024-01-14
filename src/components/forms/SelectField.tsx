import React from 'react';

interface Option {
  label: string;
  value: string;
}

interface SelectFieldProps {
  options: Option[];
  className?: string;
  name?: string;
  id?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({ options, ...rest }) => {
  return (
    <select
      {...rest}
      className={`w-full p-3 text-sm font-medium text-[#3A3541DE] opacity-60 tracking-[0.15px] focus:border-[#F8A21C] rounded-[7px] border-solid border-2 border-[#A8A8A8] ${rest.className}`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectField;
