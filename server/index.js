import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

import databaseConnection from './config/databaseConnection.js';
import router from './routes/route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;
const DATABASE_NAME = process.env.DATABASE_NAME;

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://thinkify.vercel.app",
        ],
        credentials: true,
    })
);
databaseConnection(DATABASE_URL, DATABASE_NAME);
app.use(express.json());
app.use(cookieParser());
app.use('/api', express.static("uploads"));
app.use("/api", router);
app.get("/", (req, res) => {
    res.send("Server Running Successfully");
})

app.listen(PORT, () => { console.log(`Server Listening at http://localhost:${PORT}`) });