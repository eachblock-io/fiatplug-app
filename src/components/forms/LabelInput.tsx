"use client"
import React, { useState } from 'react'

interface LabelInputProps {
  label: string,
  type: string,
  name: string,
}

const LabelInput = ({label, type, name}:LabelInputProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleFocus = () => {
      setIsFocused(true);
  }

  const handleBlur = () => {
      setIsFocused(false);
  }

  const handleMouseEnter = () => {
      setIsHovered(true);
  }

  const handleMouseLeave = () => {
      setIsHovered(false);
  }
  return (
    <label className={`flex flex-col px-4 pt-[11px] pb-1 border-[0.7px] border-solid ${isFocused ? "border-black" : isHovered ? "border-[#00000050]" : "border-[#00000033]"} rounded-[10px] h-[66px]`}>
      <span className="text-xs font-medium text-[#1B1D21] tracking-[-0.2px]">{label}</span>
      <input
        type={type}
        name={name}
        required
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="py-2 border-none outline-none focus:!outline-none text-xs font-normal text-[#1b1d21cc] placeholder:text-xs placeholder:font-medium placeholder:text-[#1B1D21]"
        />
    </label>
  )
}

export default LabelInput