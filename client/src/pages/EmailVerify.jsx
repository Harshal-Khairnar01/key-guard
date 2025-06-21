import React, { useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

const EmailVerify = () => {
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  const { backendUrl, isLoggedIn, userData, getUserData } =
    useContext(AppContext);

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

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join("");

      const { data } = await axios.post(
        backendUrl + "/api/auth/verify-account",
        { otp }
      );

      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    isLoggedIn && userData && userData.isAccountVerified && navigate("/");
  }, [isLoggedIn, userData]);

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
        <form
          onSubmit={onSubmitHandler}
          className=" bg-[#f2c600] p-8 rounded-lg shadow-lg w-96 text-sm  "
        >
          <h1 className=" text-[#0d6063] text-2xl font-semibold text-center mb-4">
            Email Verification
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
                  className=" w-12 h-12  bg-white  text-[#0d6063] text-center text-xl rounded-md no-arrow"
                  ref={(e) => (inputRefs.current[index] = e)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
          </div>
          <button className=" w-full py-3 bg-[#074547]  rounded-full text-white cursor-pointer">
            Verify Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailVerify;
