import { useEffect } from "react";

import ChatContainer from "@/components/containers/ChatContainer";

// import { io } from "socket.io-client";
import { socket } from "@/utils/socket";
import Room from "./room";
import { useRouter } from "next/router";

//let socket;

export default function Home() {
  const router = useRouter();
  useEffect(()=>{
    router.push('/room');
  }, []);
  return (
    <div></div>
  );
}
