import "dotenv/config";

import express from "express";
import cors from "cors";

import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";

export const app = express();

app.set("trust proxy", 1);

const allowedOrigins = process.env.ALLOWED_ORIGIN.split(",")||[];


if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.headers["x-forwarded-proto"] !== "https") {
      return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
  });
}


app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:allowedOrigins, credentials: true }));


// API Endpoints --> routes declaration
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)

app.get("/ping", (req, res) => {
  res.send("Server is running 🚀");
});



