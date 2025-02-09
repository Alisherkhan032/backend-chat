require("dotenv").config({ path: "./src/.env" });
const express = require("express");
const connectDB = require("./lib/db");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const authRoutes = require("./routes/auth.route");
const messageRoutes = require("./routes/message.route");
const {app, server} = require("./lib/socket");


const PORT = process.env.PORT || 5001;

const FRONTEND_URL = process.env.NODE_ENV === "production" 
  ? "https://vartalaap-one.vercel.app"  // Vercel domain
  : "http://localhost:5173"; //  local frontend port

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json({ limit: '1mb' })); 
app.use(express.urlencoded({ limit: '1mb', extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});