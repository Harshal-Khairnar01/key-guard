import express from "express";
import userAuth from "../middleware/userAuth.js";
import { getUserInformation } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/user-info", userAuth, getUserInformation);

export default userRouter;
