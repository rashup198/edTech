import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { sendOtp, signUp } from '../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import OTPInput from 'react-otp-input';

const VerifyEmail = () => {
  const [otp, setOtp] = useState('');
  const { signupData, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { accountType, email, password, confirmPassword, firstName, lastName } = signupData;
    dispatch(signUp(accountType, email, password, confirmPassword, firstName, lastName, otp, navigate));
  };

  useEffect(() => {
    if (!signupData) {
      navigate('/signup');
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      {loading ? (
        <div>
          <h1>Loading......</h1>
        </div>
      ) : (
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h1 className="text-2xl font-bold mb-4">Verify Email</h1>
          <p className="text-gray-600 mb-4">Enter the verification code we just sent to your email address</p>
          <form onSubmit={handleOnSubmit} className="space-y-4">
            <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            separator={<span>-</span>}
            isInputNum
            inputStyle="w-12 h-12 border p-2 text-center"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            >
              Verify
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link to="/login" className="text-blue-500">
              <p className="flex items-center gap-x-2">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>
          <button
            onClick={() => dispatch(sendOtp(signupData.email))}
            className="text-blue-500 hover:underline focus:outline-none"
          >
            Resend it
          </button>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
