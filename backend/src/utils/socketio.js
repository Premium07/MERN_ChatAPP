import { Server } from "socket.io";
import http from "http";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

export const getReceiverSocketId = (userId) => {
    return OnlineUsersSocket[userId]
};

// to store online users.
const OnlineUsersSocket = {}; // {userId : socketId}

io.on("connection", (socket) => {
  console.log(`user connected ${socket.id}`);

  const userId = socket.handshake.query.userId;

  if (userId) OnlineUsersSocket[userId] = socket.id;

  //io.emit() is used to send events all the connected clients
  io.emit("OnlineUsers", Object.keys(OnlineUsersSocket));

  socket.on("disconnect", () => {
    console.log(`user disconnected, ${socket.id}`);

    delete OnlineUsersSocket[userId];
    io.emit("OnlineUsers", Object.keys(OnlineUsersSocket));
  });
});

export { io, app, server };
