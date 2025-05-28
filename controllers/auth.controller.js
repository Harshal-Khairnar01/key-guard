import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

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
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
