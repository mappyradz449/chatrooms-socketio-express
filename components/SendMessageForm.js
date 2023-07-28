import { useRef } from "react";
import { BsSendFill } from "react-icons/bs";
import { TbArrowsJoin2 } from "react-icons/tb";
import { socket } from "@/utils/socket";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Form } from "./ui/form";

const SendMessageForm = () => {
  const inputRef = useRef("");
  const joinRef = useRef("");

  const onSendMessage = ({ value: message }, { value: roomId }) => {
    //console.log(roomId);
    const newMessage = {
      content: message,
      sender: {
        name: "User 1",
        id: socket.id,
      },
    };
    console.log("[SendMessageForm]", newMessage, roomId);
    socket.emit("send-message", JSON.stringify(newMessage), roomId);
  };

  const onRoomJoin = ({ value: roomId }) => {
    //console.log(roomId);

    //console.log("[AssignRoomForm]", newRoom);
    socket.emit("join-room", roomId);
  };
  // socket.on("send-message", onSendMessage);

  return (
    <div className="bg-slate-300 fixed bottom-0 w-full py-10 shadow-lg flex  justify-center">
      <div className="flex">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const msgVal = inputRef.current;
            const roomVal = joinRef.current;
            onSendMessage(msgVal, roomVal);
            onRoomJoin(roomVal);
          }}
        >
          <div className="flex  w-full max-w-3xl space-x-2 m-4">
            <Input
              ref={inputRef}
              type="text"
              //value={message}
              placeholder="Type a message"
              className="w-3/4 p-2 rounded-2xl placeholder:italic"
            />
            <Button type="submit" className="mx-2 w-auto rounded-2xl">
              Send
              <div className="rounded-full bg-blue-500 p-2 m-2">
                <BsSendFill className="w-3 h-3 text-white" />
              </div>
            </Button>
          </div>

          <div className="flex  w-full max-w-3xl  space-x-2 m-4">
            <Input
              ref={joinRef}
              type="text"
              //value={message}
              placeholder="Enter Room ID"
              className="w-full p-2 rounded-2xl placeholder:italic"
            />
            <Button type="submit" className="mx-2 w-auto rounded-2xl">
              Join
              <div className="rounded-full bg-blue-500 p-2 m-2">
                <TbArrowsJoin2 className="w-4 h-4 text-white" />
              </div>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendMessageForm;
