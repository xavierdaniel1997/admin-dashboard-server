import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./config/connectDB.js";
import userRoute from "./routes/userRoutes.js";
import cors from "cors"
import path from "path"
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import adminRoute from "./routes/adminRoutes.js";

const app = express();

const PORT = 8000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)


connectDB()


app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
  }));
  
app.use(express.json())
app.use(cookieParser())
app.use(express.static("public"))

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api/user", userRoute)
app.use("/api/admin", adminRoute)


app.listen(PORT, () => {
    console.log(`server start running at port ${PORT}`)
})