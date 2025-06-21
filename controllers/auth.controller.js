import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import transporter from "../utils/nodemailer.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // console.log(name, email, password);

    if ([name, email, password].some((field) => field?.trim() === "")) {
      return res.json({
        success: false,
        message: "Missing Details!",
      });
    }

    const isEmailExists = await User.findOne({ email });
    if (isEmailExists) {
      return res.json({
        success: false,
        message: "Email already Exist!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // sending welcome email
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to KeyGuard!",
      html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f8f9fa;">
      <h2 style="color: #0d6063;">Welcome to <span style="color: #f2ba00;">KeyGuard</span> 👋</h2>
      <p>Hello <strong>${email}</strong>,</p>
      <p>We're thrilled to have you on board. Your email has been successfully linked to your KeyGuard account.</p>
      <p>Start exploring now and stay secure!</p>
      <br />
      <p>Warm regards,<br><strong>KeyGuard Team</strong></p>
    </div>
  `,
    };

    await transporter.sendMail(mailOptions);

    return res.json({
      success: true,
      token,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "Invalid Email or password!",
      });
    }
    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.json({
        success: false,
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res.json({
      success: true,
      message: "Logout Successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// Send Verification OTP to User's email
export const sendVerifyOtp = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (user.isAccountVerified) {
      return res.json({
        success: false,
        message: "Account Already verified",
      });
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    // sending welcome email
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Verify Your Email - KeyGuard",
      html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
      <h2 style="color: #0d6063;">Verify Your Email</h2>
      <p>Hi <strong>${user.name || user.email}</strong>,</p>
      <p>Use the OTP below to verify your KeyGuard account:</p>
      <h1 style="letter-spacing: 4px; color: #0d6063;">${otp}</h1>
      <p>This OTP is valid for <strong>24 hours</strong>. Please do not share this with anyone.</p>
      <br />
      <p>Thanks & Regards,<br><strong>KeyGuard Security</strong></p>
    </div>
  `,
    };

    await transporter.sendMail(mailOptions);

    return res.json({
      success: true,
      message: "Verification OTP sent to the email",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;
  if (!userId || !otp) {
    return res.json({
      success: false,
      message: "Missing Details",
    });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.json({
        success: false,
        message: "User not found!",
      });
    }

    if (user.verifyOtp === "" || user.verifyOtp !== otp) {
      return res.json({
        success: false,
        message: "Invalid OTP",
      });
    }
    if (user.verifyOtpExpireAt < Date.now) {
      return res.json({
        success: false,
        message: "Expired OTP",
      });
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;

    await user.save();

    return res.json({
      success: true,
      message: "Email Verified Successfully!",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// check if user is authenticated
export const isAuthenticated = async (req, res) => {
  try {
    return res.json({
      success: true,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// send Password reset OTP
export const sendPasswordResetOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({
      success: false,
      message: "Email is required!",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found!",
      });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    // sending email for reset password
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Reset Your Password - KeyGuard",
      html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #fffaf0;">
      <h2 style="color: #d9534f;">Password Reset Request</h2>
      <p>Hello <strong>${user.name || user.email}</strong>,</p>
      <p>We received a request to reset your KeyGuard password. Please use the OTP below:</p>
      <h1 style="letter-spacing: 3px; color: #d9534f;">${otp}</h1>
      <p>This OTP is valid for 24 hours. If you didn’t request this, please ignore this email.</p>
      <br />
      <p>Regards,<br><strong>KeyGuard Support</strong></p>
    </div>
  `,
    };

    await transporter.sendMail(mailOptions);

    return res.json({
      success: true,
      message: "OTP sent to your email",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  const { email, newPassword, otp } = req.body;

  if (!email || !otp || !newPassword) {
    return res.json({
      success: false,
      message: "Missing Details",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found!",
      });
    }

    if (user.resetOtp === "" || user.resetOtp !== otp) {
      return res.json({
        success: false,
        message: "Invalid OTP",
      });
    }
    if (user.resetOtpExpireAt < Date.now) {
      return res.json({
        success: false,
        message: "OTP Expired",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    user.resetOtp = "";
    user.resetOtpExpireAt = 0;

    await user.save();

    return res.json({
      success: true,
      message: "Password has been Reset Successfully!",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
