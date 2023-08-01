const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const { v4: uuidv4 } = require("uuid");

var format = require("date-fns/format");

export default function SocketHandler(req, res) {
  if (res.socket.server.io) {
    console.log("[server] Socket alreaady running ...");
    res.end();
    return;
  } else {
    console.log("[server] Socket in initializing ... ");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;


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
        const {roomId, userName} = JSON.parse(jsonData);
        console.log("[server join]", roomId);
        socket.join(roomId); ///join the user to a socket room
        //let createdTime = Date.now();
  
        console.log("User joined", userName);
        socket.emit("receive-join", roomId);
        io.to(roomId).emit("user-joined", userName)
      });
    });

    console.log("Setting up socket");
    res.end();
  }
}

// server.listen(3000, () => {
//   console.log("[app] Server launched, listening on port 8000");
// });
