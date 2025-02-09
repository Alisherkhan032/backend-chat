const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);

const FRONTEND_URL = process.env.NODE_ENV === "production" 
  ? "https://vartalaap-one.vercel.app"  // Vercel domain
  : "http://localhost:5173"; //  local frontend port

  const io = new Server(server, {
    cors: {
      origin: FRONTEND_URL,
      methods: ["GET", "POST"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"]
    },
  });

// store online users
const userSocketMap = {}; // {userId: socketId}

const getRecieverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
  }
  io.emit("getOnlineUsers", Object.keys(userSocketMap)); // send online users to all clients

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); // send online users to all clients
  });
});

module.exports = {
  io,
  server,
  app,
  getRecieverSocketId,
};
