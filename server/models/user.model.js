import mongoose from "mongoose";

const emailRegexPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    trim: true,
    unique: false,
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    validate: {
      validator: function (value) {
        return emailRegexPattern.test(value);
      },
      message: "please enter a valid email",
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"], // for social auth
    minlength: [6, "Password must be atleast 6 characters!"],
    validate: {
      validator: function (value) {
        return value && value.trim().length >= 6;
      },
      message: "Password must be at least 6 characters and not empty",
    },
  },
  verifyOtp: {
    type: String,
    default: "",
  },
  verifyOtpExpireAt: {
    type: Number,
    default: 0,
  },
  isAccountVerified: {
    type: Boolean,
    default: false,
  },
  resetOtp: {
    type: String,
    default: "",
  },
  resetOtpExpireAt: {
    type: Number,
    default: "0",
  },
});

const User = mongoose.models.user || mongoose.model("user", userSchema);
export default User;
