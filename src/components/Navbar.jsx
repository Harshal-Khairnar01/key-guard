import React, { useContext, useState } from "react";

import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedIn, userData, setUserData } =
    useContext(AppContext);

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp"
      );
      if (data.success) {
        navigate("/email-verify");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      data.success && setIsLoggedIn(false);
      data.success && setUserData(false);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const [dropdownVisible, setDropdownVisible] = useState(false);

  return (
    <div className="  w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
      <img src={assets.logo} alt="" className=" w-24 sm:w-28" />
      {userData ? (
        <div className="relative">
          <div
            onClick={() => setDropdownVisible(!dropdownVisible)}
            className="w-8 h-8 flex justify-center items-center rounded-full bg-black text-white cursor-pointer"
          >
            {userData.name[0].toUpperCase()}
          </div>

          {dropdownVisible && (
            <div className="absolute top-10 right-0 z-10 text-black rounded bg-gray-100 text-sm shadow-lg">
              <ul className="list-none m-0 p-2 ">
                {!userData.isAccountVerified && (
                  <li
                    onClick={() => {
                      sendVerificationOtp();
                      setDropdownVisible(false);
                    }}
                    className="py-1 px-2 hover:bg-gray-300 cursor-pointer rounded-md"
                  >
                    Verify Email
                  </li>
                )}
                <li
                  onClick={() => {
                    logout();
                    setDropdownVisible(false);
                  }}
                  className="py-1 px-2 hover:bg-gray-300 cursor-pointer mr-10 rounded-md"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-[#0d6063] hover:bg-[#f1c411] transition-all cursor-pointer bg-[#f1d711]"
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Navbar;
