import { useEffect } from "react";

import ChatContainer from "@/components/containers/ChatContainer";

// import { io } from "socket.io-client";
import { socket } from "@/utils/socket";

//let socket;

export default function Home() {
  useEffect(() => {
    socketInitializer();

    // function onSendMessage(){

    // }
    //socket.connect();

    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  function onConnect() {
    console.log("[client] Connected to :  ", socket.id);
  }
  function onDisconnect() {
    console.log("Disconnected");
  }
  const socketInitializer = async () => {
    await fetch("/api/socket");
    //socket = io();

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
  };

  return (
    <div className="">
      <ChatContainer />
    </div>
  );
}
