import path from "path"
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authroutes.js"
import messageRoutes from "./routes/messageroutes.js"
import userRoutes from "./routes/userroutes.js"

import connectToMongoDB from "./db/conn.js";
import { app, server } from "./socket/socket.js";

const PORT = process.env.PORT || 3010;

const __dirname=path.resolve()

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);
app.use("/api/users",userRoutes)

app.use(express.static(path.join(__dirname,"frontend","ChitChat","dist")))

app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"frontend","ChitChat","dist","index.html"))
})

app.get("/", (req, res) => {
  res.send("Hello");
});


server.listen(PORT, () =>{
    connectToMongoDB();
 console.log(`Server running on port ${PORT}`)});
