import "dotenv/config";

import express from "express";
import cors from "cors";

import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";

export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));


// API Endpoints --> routes declaration
app.use('/api/auth',authRouter)

