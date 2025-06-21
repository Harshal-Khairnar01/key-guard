import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { backendUrl } = useContext(AppContext);

  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState(0);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  const inputRefs = React.useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-password-reset-otp",
        {
          email,
        }
      );

      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && setIsEmailSent(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    try {
      const otpArray = inputRefs.current.map((e) => e.value);
      setOtp(otpArray.join(""));

      setIsOtpSubmitted(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/reset-password",
        { email: email, otp: otp, newPassword: password }
      );

      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className=" flex flex-col min-h-screen sm:px-0 bg-[#0d6063]">
      <div className=" mt-2 flex justify-between items-center lg:px-20 px-2">
        <img
          onClick={() => navigate("/")}
          src={assets.logo}
          alt="KeyGuard"
          className=" w-20"
        />
        <h1 className=" text-2xl font-semibold text-amber-400">KeyGuard</h1>
      </div>

      <div className=" m-auto">
        {/* enter email id  */}

        {!isEmailSent && (
          <form
            onSubmit={onSubmitEmail}
            className=" bg-[#f2c600] p-8 rounded-lg shadow-lg w-96 text-sm  "
          >
             <h1 className=" text-[#0d6063] text-2xl font-semibold text-center mb-4">
              Reset Password
            </h1>
            <p className=" text-center mb-6  text-gray-700">
              Enter your registered email address{" "}
            </p>
            <div className=" mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full  bg-white ">
              <MdEmail />
              <input
                type="email"
                placeholder="Email id"
                className=" outline-none  text-gray-800  "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button className=" w-full py-2.5 bg-[#074547] rounded-full text-white cursor-pointer mt-3">
              Reset Password
            </button>
          </form>
        )}

        {/* otp input form  */}
        {!isOtpSubmitted && isEmailSent && (
          <form
            onSubmit={onSubmitOtp}
            className=" bg-[#f2c600] p-8 rounded-lg shadow-lg w-96 text-sm  "
          >
              <h1 className=" text-[#0d6063] text-2xl font-semibold text-center mb-4">
              Reset Password Otp
            </h1>
             <p className=" text-center mb-6  text-gray-700">
              Enter the 6-digits code sent to your email id.{" "}
            </p>
            <div className=" flex justify-between mb-8" onPaste={handlePaste}>
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <input
                    type="text"
                    maxLength="1"
                    key={index}
                    required
                    className=" w-12 h-12 bg-white  text-[#0d6063] text-center text-xl rounded-md no-arrow"
                    ref={(e) => (inputRefs.current[index] = e)}
                    onInput={(e) => handleInput(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  />
                ))}
            </div>
            <button className=" w-full py-2.5 bg-[#074547]  rounded-full text-white cursor-pointer">
              Submit
            </button>
          </form>
        )}

        {/* enter new password  */}
        {isOtpSubmitted && isEmailSent && (
          <form
            onSubmit={onSubmitNewPassword}
            className=" bg-[#f2c600] p-8 rounded-lg shadow-lg w-96 text-sm  "
          >
             <h1 className=" text-[#0d6063] text-2xl font-semibold text-center mb-4">
              New Password
            </h1>
             <p className=" text-center mb-6  text-gray-700">
              Enter the new Password below{" "}
            </p>
            <div className=" mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-white">
              <RiLockPasswordFill />
              <input
                type="password"
                placeholder="Password"
                 className=" outline-none  text-gray-800  "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className=" w-full py-2.5  bg-[#074547] rounded-full text-white cursor-pointer mt-3">
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
