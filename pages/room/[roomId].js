import { useState, useEffect } from "react";

import ChatContainer from "@/components/containers/ChatContainer";

// import { io } from "socket.io-client";
import { socket } from "@/utils/socket";

import { useRouter } from "next/router";

const ChatPage = () => {
  const router = useRouter();
  const [currentRoomId, setCurrentRoomId] = useState("");
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    socketInitializer();
  }, []);

  useEffect(() => {
    if (router.query.roomId) {
      // construct current user
      setCurrentUser({
        id: socket.id,
        name: router.query.userName,
      });
      // set the room state
      setCurrentRoomId(router.query.roomId);

      // socket can be connected now
      socket.emit("join-room", router.query.roomId);
    }
  }, [router.query]);

  function onConnect() {
    console.log("[client] Connected to :  ", socket.id);
  }
  function onDisconnect() {
    console.log("Disconnected");
  }
  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
  };

  return (
    <div className="">
      <ChatContainer user={currentUser} roomId={currentRoomId} />
    </div>
  );
};

export default ChatPage;
