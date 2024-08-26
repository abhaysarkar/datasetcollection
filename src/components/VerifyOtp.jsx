// src/components/VerifyOtp.js
import React, { useState } from 'react';
import axios from 'axios';

const VerifyOtp = ({ email }) => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(`https://datacollection-backend-eb040f587829.herokuapp.com/verify-otp/${email}/${otp}`);
      setMessage(response.data);
    } catch (error) {
      console.error('Error verifying OTP', error);
      setMessage('Error verifying OTP');
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
      />
      <button onClick={handleVerifyOtp}>Verify OTP</button>
      <p>{message}</p>
    </div>
  );
};

export default VerifyOtp;


