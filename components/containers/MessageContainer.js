import { useState, useEffect } from "react";
import OwnMessage from "@/components/messages/OwnMessage";
import OtherUserMessage from "@/components/messages/OtherUserMessage";
import { socket } from "@/utils/socket";

const MessageContainer = () => {
  const MAX_ROOM = 4;

  const onReceiveMessage = (message) => {
    const parsedMessage = JSON.parse(message);
    console.log(parsedMessage);
    const newMessage = {
      ...parsedMessage,
      self: parsedMessage.sender.id === socket.id,
    };

    setMessages((oldMessages) => {
      return [...oldMessages, newMessage];
    });
    //console.log(messages);
  };

  const onJoin = (roomData) => {
    //const parsedRoomData = JSON.parse(roomData);
    console.log(roomData + "has joined chat app");
  };

  useEffect(() => {
    socket.on("receive-message", onReceiveMessage);

    socket.on("receive-join", onJoin);

    return () => {
      socket.off("receive-message");
    };
  }, []);

  const [messages, setMessages] = useState([
    // {
    //   id: "1",
    //   content:
    //     "Hello. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    //   sender: {
    //     name: "maha",
    //     id: "9",
    //   },
    //   self: true,
    // },
    // {
    //   id: "2",
    //   content: "Hi there",
    //   sender: {
    //     name: "naim",
    //     id: "3",
    //   },
    //   self: false,
    // },
    // {
    //   id: "3",
    //   content: "How are you?",
    //   sender: {
    //     name: "rodshi",
    //     id: "5",
    //   },
    //   self: true,
    // },
  ]);

  return (
    <div>
      {messages.map((message) => {
        //console.log(message);
        return message.self ? (
          <OwnMessage
            content={message.content}
            key={message.id}
            sender={message.sender.name}
          />
        ) : (
          <OtherUserMessage
            content={message.content}
            key={message.id}
            sender={message.sender.name}
          />
        );
      })}
    </div>
  );
};

export default MessageContainer;
