// socket.js
import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

// used to store online users -> { userId: socketId }
const userSocketMap = {};

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"], // frontend URL
    methods: ["GET", "POST"],
  },
});

// helper function to get receiver's socket id
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  console.log("⚡ A user connected:", socket.id);

  const userId = socket.handshake.query.userId; // frontend will send ?userId=...
  if (userId) {
    userSocketMap[userId] = socket.id;
    console.log("✅ User registered:", userId);
  }

  // send updated online users list to all clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // handle disconnection
  socket.on("disconnect", () => {
    console.log("❌ A user disconnected:", socket.id);
    if (userId) {
      delete userSocketMap[userId];
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
