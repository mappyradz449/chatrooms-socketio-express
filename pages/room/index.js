import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useRef } from "react";
import Router from "next/router";
import Navbar from "@/components/Navbar";
//import { useRouter } from "next/router";

export default function Room () {
  const joinRoomRef = useRef();
  const userInputRef = useRef();
  return (
    <div className="bg-gray-700 h-screen flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="">Join Room</CardTitle>
          <CardDescription>Join Room giving your room Id.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();

              const userName = userInputRef.current.value;
              const roomId = joinRoomRef.current.value;

              Router.push({
                pathname: `/room/${roomId}`,
                query: {
                  userName: userName,
                },
              });

              e.target.reset();
            }}
          >
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  ref={userInputRef}
                  id="name"
                  placeholder="Enter your name"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Room</Label>
                <Input
                  ref={joinRoomRef}
                  type="text"
                  //value={message}
                  placeholder="Enter Room ID"
                />
              </div>
              <div>
                <Button type="submit" className="w-full h-full bg-gray-700">
                  Join
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          {/* <Button type="submit" className="w-full h-full">
            Join
          </Button> */}
        </CardFooter>
      </Card>
    </div>
  );
};
