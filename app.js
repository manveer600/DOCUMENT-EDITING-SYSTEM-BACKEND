import express from "express";
import userRoutes from "./routers/userRoutes.js";
import cors from 'cors';
import dotenv from 'dotenv'
import helmet from 'helmet';
dotenv.config();
const app = express();
app.use(helmet());
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        optionsSuccessStatus: 204
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', userRoutes);
export default app;