import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const port = process.env.PORT || 4000;
const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

const server = createServer(app);

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("New client connected" + socket.id);
  console.log(socket);
});

server.listen(port, () => {
  console.log("Listening on :3000");
});
