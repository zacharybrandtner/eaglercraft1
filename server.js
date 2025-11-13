// Simple Eaglercraft Relay server for GitHub Codespaces
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// When someone connects
io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on("message", (data) => {
    console.log("Received:", data);
    socket.broadcast.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Start server
const PORT = process.env.PORT || 8081;
server.listen(PORT, () => {
  console.log(`✅ Relay server running on port ${PORT}`);
});
