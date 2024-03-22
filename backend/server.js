import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authroutes.js"
import messageRoutes from "./routes/messageroutes.js"
import userRoutes from "./routes/userroutes.js"

import connectToMongoDB from "./db/conn.js";

const app = express();
const PORT = process.env.PORT || 3010;

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);
app.use("/api/users",userRoutes)

app.get("/", (req, res) => {
  res.send("Hello");
});


app.listen(PORT, () =>{
    connectToMongoDB();
 console.log(`Server running on port ${PORT}`)});
