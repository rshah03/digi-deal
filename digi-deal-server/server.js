import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const port = process.env.PORT || 4000;
const app = express();

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let interval;

io.on("connection", (socket) => {
  console.log("New client connected" + socket.id);

  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = (socket) => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

server.listen(port, () => {
  console.log(`Listening on :${port}`);
});
