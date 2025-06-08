import React from "react";

import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { ShieldCheck, LockKeyhole, MailCheck } from "lucide-react";
import {  FaHeart } from "react-icons/fa";

const Header = () => {
  const { userData } = useContext(AppContext);

  return (
    <div className=" flex flex-col items-center mt-20 px-4 text-center text-white">
      <h1 className=" flex items-center  gap-2 text-xl sm:text-3xl font-medium mb-2">
        Hey {userData ? userData.name : "User"}!
      </h1>
      <h2 className=" text-3xl sm:text-5xl font-semibold mb-4 text-amber-300">
        Welcome at KeyGuard
      </h2>
      <p className="  mb-8 max-w-md">
        Secure your application with email-verified authentication powered by
        the MERN Stack.
      </p>

      <div className="mt-20 grid md:grid-cols-3 gap-10 text-center max-w-6xl text-gray-800">
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
          <ShieldCheck className="mx-auto h-10 w-10 text-green-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">JWT Authentication</h3>
          <p className="text-gray-600">
            Secure login system using JSON Web Tokens for stateless sessions.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
          <LockKeyhole className="mx-auto h-10 w-10 text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Encrypted Passwords</h3>
          <p className="text-gray-600">
            Passwords are hashed using bcrypt for maximum security.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
          <MailCheck className="mx-auto h-10 w-10 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Email Verification</h3>
          <p className="text-gray-600">
            Users must confirm their email address after registration.
          </p>
        </div>
      </div>

      <footer className="mt-20 w-full border-t pt-6">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-100 ">
          <p>
            &copy; {new Date().getFullYear()} KeyGuard Auth. All rights
            reserved.
          </p>
          <p  className=" flex items-center">
            Developed with <FaHeart className="text-red-500 mx-2" size={18} /> by{" "}
            <span className=" mx-2  font-semibold">
              Harshal Khairnar
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Header;
