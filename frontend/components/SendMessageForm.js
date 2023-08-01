import { useRef } from "react";
import { socket } from "@/utils/socket";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

const SendMessageForm = ({ user, roomId }) => {
  const inputRef = useRef("");

  const sendNewMessage = ({ value: message }) => {
    const newMessage = {
      content: message,
      sender: user,
    };
    console.log("[SendMessageForm]", newMessage, roomId);
    socket.emit("send-message", JSON.stringify(newMessage), roomId);
  };

  return (
    <div className="bg-gray-900 fixed bottom-0 w-full shadow-lg flex justify-center h-32">
      <form
        className="w-full flex flex-col justify-center"
        onSubmit={(e) => {
          e.preventDefault();

          const msgVal = inputRef.current;

          sendNewMessage(msgVal);
          e.target.reset();
        }}
      >
        <div className="flex space-x-2 m-4 items-center">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Type a message"
            className="p-2 placeholder:italic text-lg w-full mx-2"
          />
          {/*           

          // TODO: IF you want to use this, use shadcn's textarea component
          <textarea
            ref={inputRef}
            type="text"
            placeholder="Type a message"
            rows={1}
            className="p-2 placeholder:italic text-lg rounded-lg w-full mx-2"
          /> */}
          <Button
            type="submit"
            className="mx-2 w-auto text-md bg-gray-700 text-white outline"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SendMessageForm;
