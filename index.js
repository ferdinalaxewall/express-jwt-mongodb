import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDatabase } from "./config/Database.js";
import router from "./routes/router.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

// Server Configuration

connectDatabase();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(router);

const port = process.env.SERVER_PORT || 5000;
app.listen(port, () => {
    console.info(`Server Successfully Running!`);
});

export default app;