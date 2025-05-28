import "dotenv/config";

import express from "express";
import cors from "cors";

import cookieParser from "cookie-parser";

export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));

app.get('/',(req,res)=>{
    res.send("API working hddh")
})
