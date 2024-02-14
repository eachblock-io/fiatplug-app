import { useState } from 'react';

const OtpInput = ({ length, onComplete }) => {
  const [otp, setOtp] = useState(new Array(length).fill(''));

  const handleChange = (element, index) => {
    const value = element.value;
    // Update the value at the current index
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1, value.length); // Ensure single character
    setOtp(newOtp);

    // Focus next input on entry
    if (value && index < length - 1) {
      element.nextSibling.focus();
    }

    // Call onComplete when all fields are filled
    if (newOtp.every((digit) => digit) && index === length - 1) {
      onComplete(newOtp.join(''));
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, length).split('');
    if (pasteData.length === length) {
      setOtp(pasteData);
      onComplete(pasteData.join(''));
    }
  };

  return (
    <div onPaste={handlePaste} className="flex justify-center space-x-2">
      {otp.map((data, index) => (
        <input
          key={index}
          type="text"
          value={data}
          maxLength="1"
          onChange={(e) => handleChange(e.target, index)}
          onFocus={(e) => e.target.select()}
          className="w-12 h-12 border-2 border-gray-300 text-center text-xl rounded-md focus:border-blue-500 focus:outline-none"
          // Tailwind CSS classes for styling
        />
      ))}
    </div>
  );
};

export default OtpInput;
