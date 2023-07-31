import { useEffect } from "react";

import ChatContainer from "@/components/containers/ChatContainer";

// import { io } from "socket.io-client";
import { socket } from "@/utils/socket";
import Room from "./room";

//let socket;

export default function Home() {
  return (
    <div>
      <Room />
    </div>
  );
}
