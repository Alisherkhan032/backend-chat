require("dotenv").config({ path: "./src/.env" });
const express = require("express");
const connectDB = require("./lib/db");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const authRoutes = require("./routes/auth.route");
const messageRoutes = require("./routes/message.route");
const {app, server} = require("./lib/socket");
const path = require("path");

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
})); 

app.use(express.json({ limit: '1mb' })); 
app.use(express.urlencoded({ limit: '1mb', extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend-chat/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend-chat/dist/index.html'));
  });
 
}

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
