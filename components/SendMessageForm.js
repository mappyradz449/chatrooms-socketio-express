import { useRef } from "react";
import { BsSendFill } from "react-icons/bs";
import { socket } from "@/utils/socket";

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
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const msgVal = inputRef.current;
          const roomVal = joinRef.current;
          onSendMessage(msgVal, roomVal);
          onRoomJoin(roomVal);
        }}
      >
        <div className="flex flex-col justify-center bg-slate-300 p-4">
          <input
            ref={inputRef}
            type="text"
            //value={message}
            placeholder="Type a message"
            className="p-2 rounded-lg placeholder:italic"
          />
          <button type="submit" className="mx-2">
            <div className="rounded-full bg-blue-700 p-2">
              <BsSendFill className="w-4 h-4 text-white" />
            </div>
          </button>
          <input
            ref={joinRef}
            type="text"
            //value={message}
            placeholder="Enter Room ID"
            className="p-2 rounded-lg placeholder:italic"
          />
          <button type="submit" className="mx-2">
            <div className="rounded-full bg-blue-700 p-2">
              <BsSendFill className="w-4 h-4 text-white" />
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendMessageForm;
