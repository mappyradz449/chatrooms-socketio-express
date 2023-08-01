///using express as backend again coz *******vercel disables nextjs socket connection**********
///so again build an express backend server then deploy it on render
///change the url of utils => socket.js file by the url provided by render after successfuly deploying backend to render

import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

const app = express();
app.use(cors());

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("[server] Connected to new client -", socket.id);

  socket.on("send-message", (message, roomId) => {
    const parsedMessage = JSON.parse(message);
    const date = new Date();
    const formattedDate = format(date, "PPpp");
    console.log(date);
    const newMessage = {
      ...parsedMessage,
      id: uuidv4(),
      time: formattedDate,
    };
    console.log("[server msg]", newMessage, roomId);
    if (roomId === "") {
      //if no room id added then  emits  msg to all (public msg)
      io.emit("receive-message", JSON.stringify(newMessage));
    } else {
      //when specific room id given then private msg sent to that specific room only
      io.to(roomId).emit("receive-message", JSON.stringify(newMessage));
    }
  });

  socket.on("join-room", (jsonData) => {
    const { roomId, userName } = JSON.parse(jsonData);
    console.log("[server join]", roomId);
    socket.join(roomId); ///join the user to a socket room
    //let createdTime = Date.now();

    console.log("[backend] User joined", userName);
    socket.emit("receive-join", roomId);
    io.to(roomId).emit("user-joined", userName);
  });
});

server.on("error", (err) => {
  console.error("[app] Error opening server", err);
});

server.listen(4000, () => {
  console.log("[app] Server launched, listening on port 4000");
});
