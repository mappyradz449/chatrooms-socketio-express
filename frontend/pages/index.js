import { useEffect } from "react";

// import { io } from "socket.io-client";
import { useRouter } from "next/router";

//let socket;

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/room");
  }, []);
  return <div></div>;
}
