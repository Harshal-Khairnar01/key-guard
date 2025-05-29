import express from "express";
import {
  register,
  login,
  logout,
  sendVerifyOtp,
  verifyEmail,
  isAuthenticated,
  sendPasswordResetOtp,
  resetPassword,
} from "../controllers/auth.controller.js";
import userAuth from "../middleware/userAuth.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

authRouter.post("/send-verify-otp", userAuth, sendVerifyOtp);
authRouter.post("/verify-account", userAuth, verifyEmail);

authRouter.post("/is-authenticated", userAuth, isAuthenticated);

authRouter.post("/send-password-reset-otp", userAuth, sendPasswordResetOtp);
authRouter.post("/reset-password", userAuth, resetPassword);

export default authRouter;
