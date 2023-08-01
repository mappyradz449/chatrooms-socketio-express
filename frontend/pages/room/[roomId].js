import { useState, useEffect } from "react";

import ChatContainer from "../../components/containers/ChatContainer";

// import { io } from "socket.io-client";
import { socket } from "../../utils/socket";

import { useRouter } from "next/router";
import { Toaster } from "../../components/ui/toaster";

export default function ChatPage() {
  const router = useRouter();
  const [currentRoomId, setCurrentRoomId] = useState("");
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    //socketInitializer();
    //const sId = socket.id;
    function onConnect() {
      console.log("[client] Connected to :  ", socket.id);

      if (router.query.roomId) {
        console.log("[roomId]socket id: ", socket.id);
        // construct current user
        setCurrentUser({
          id: socket.id,
          name: router.query.userName,
        });
        // set the room state
        setCurrentRoomId(router.query.roomId);

        // socket can be connected now
        const data = {
          roomId: router.query.roomId,
          userName: router.query.userName,
        };
        //console.log(data);
        socket.emit("join-room", JSON.stringify(data));
      }
      //var id = socket.io.engine.id;
    }
    function onDisconnect() {
      console.log("Disconnected");
    }

    //console.log(router.query);

    socket.connect();
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.disconnect();
    };
  }, [router.query]);

  // useEffect(() => {
  //   if (router.query.roomId) {
  //     //console.log("[roomId]socket id: ", );
  //     // construct current user
  //     setCurrentUser({
  //       id: socket.id,
  //       name: router.query.userName,
  //     });
  //     // set the room state
  //     setCurrentRoomId(router.query.roomId);

  //     // socket can be connected now
  //     const data = {
  //       roomId: router.query.roomId,
  //       userName: router.query.userName,
  //     };
  //     //console.log(data);
  //     socket.emit("join-room", JSON.stringify(data));
  //   }
  // }, [router.query]);

  // const socketInitializer = async () => {
  //   await fetch("/api/socket");
  //   socket.on("connect", onConnect);
  //   socket.on("disconnect", onDisconnect);
  // };

  return (
    <div className="">
      <ChatContainer user={currentUser} roomId={currentRoomId} />
      <Toaster />
    </div>
  );
}
