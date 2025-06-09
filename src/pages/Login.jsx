import React from "react";
import { useState } from "react";
import { assets } from "../assets/assets";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContext);

  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/auth/register", {
          name,
          email,
          password,
        },
      { withCredentials: true }
      );
        if (data.success) {
          setIsLoggedIn(true);
          navigate("/");
          getUserData();
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/auth/login", {
          email,
          password,
        },
      { withCredentials: true }
      );
        if (data.success) {
          setIsLoggedIn(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
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

      <div className=" m-auto    p-10  rounded-lg shadow-lg  sm:w-96  text-sm bg-white">
        <h2 className=" text-3xl font-semibold text-[#18494b] text-center mb-3">
          {state === "Sign Up" ? "Create Account" : "Login "}
        </h2>
        <p className=" text-center text-sm mb-6">
          {state === "Sign Up"
            ? "Create your account"
            : "Login to your account!"}
        </p>

        <form onSubmit={onSubmitHandler}>
          {state === "Sign Up" && (
            <div className=" mb-4  flex items-center gap-3 w-full px-5 py-2.5 rounded-full  border">
              <FaUser />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Full Name"
                required
                className="  text-gray-800 bg-transparent outline-none"
              />
            </div>
          )}

          <div className=" mb-4  flex items-center gap-3 w-full px-5 py-2.5 rounded-full  border">
            <MdEmail />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email Id"
              required
              className="  text-gray-800 bg-transparent outline-none"
            />
          </div>
          <div className=" mb-4  flex items-center gap-3 w-full px-5 py-2.5 rounded-full border ">
            <RiLockPasswordFill />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="text"
              placeholder="Password"
              required
              className="  text-gray-800 bg-transparent outline-none"
            />
          </div>
          <p
            onClick={() => navigate("/reset-password")}
            className="ml-2 mb-4   text-[#0d6063]  cursor-pointer"
          >
            Forgot Password?
          </p>
          <button className=" w-full py-2.5 rounded-full bg-[#f2ba00]  text-white font-medium cursor-pointer ">
            {state}
          </button>
        </form>
        {state === "Sign Up" ? (
          <p className="  text-gray-600 text-center text-xs mt-4">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className=" text-[#0d6063] cursor-pointer underline"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="  text-gray-600 text-center text-xs mt-4">
            Don't have an account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className=" text-[#0d6063] cursor-pointer underline"
            >
              Sign Up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
