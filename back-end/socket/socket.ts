import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"]
  }
});

export const getReceiverSocketId = (receiverId: string) => {
  return userSocketMap[receiverId];
}

const userSocketMap: Record<string, string> = {};

io.on("connection", (socket) => {
  // console.log("user connected: ", socket.id);

  const userId = socket.handshake.query.userId;
  if (typeof userId === "string") {
    userSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    if (typeof userId === "string") {
      delete userSocketMap[userId];
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    // console.log("user disconnected:", socket.id);
  });
});

export { app, io, server };
