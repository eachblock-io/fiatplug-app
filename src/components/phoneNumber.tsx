"use client"
import { useState } from 'react';

const PhoneNumberInput = () => {
    const [countryCode, setCountryCode] = useState('+1'); // Default to US
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleCountryChange = (event) => {
        setCountryCode(event.target.value);
    };

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    };

    return (
        <div className='border-o' style={{ display: 'flex', alignItems: 'center' }}>
            <select className='mb-4' value={countryCode} onChange={handleCountryChange} style={{ marginRight: '8px' }}>
                <option value="+234">+234</option>
                <option value="+44">+44</option>
                <option value="+91">+91</option>
            </select>
            <span className='mb-4' style={{ marginRight: '8px' }}>|</span>
            <input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                placeholder="Phone Number"
                className='mb-4'
            />
        </div>
    );
};

export default PhoneNumberInput;
