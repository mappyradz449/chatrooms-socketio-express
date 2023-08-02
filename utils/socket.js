// import { io } from "socket.io-client";  ////for nextjs which allows build in server connection
// export const socket = io();

///using express
import { io } from "socket.io-client";
export const socket = io("https://live-chat-maha.onrender.com", {
  autoConnect: false,
});
