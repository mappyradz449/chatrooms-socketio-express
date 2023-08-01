import { useState, useEffect, useRef } from "react";
import OwnMessage from "@/components/messages/OwnMessage";
import OtherUserMessage from "@/components/messages/OtherUserMessage";
import { socket } from "@/utils/socket";

import { useToast } from "../../components/ui/use-toast"


const MessageContainer = ({ userName }) => {
    const { toast } = useToast()
  const messageEndRef = useRef(null); //for auto scroll behaviour

  const [joinMsg, setJoinMsg] = useState(false); //state to display who joined the room

  const onReceiveMessage = (message) => {
    const parsedMessage = JSON.parse(message);
    //console.log(parsedMessage);
    const newMessage = {
      ...parsedMessage,
      self: parsedMessage.sender.id === socket.id
    };
    console.log(newMessage);
    setMessages((oldMessages) => {
      return [...oldMessages, newMessage];
    });
    //console.log(messages);
  };

  const onReceiveJoin = (userName) => {
    
  };

  const onUserJoined = (userName) =>{
    console.log("NEW USER", userName)
    toast({
      title: `${userName} has joined the chat!`,
    })
  }

  useEffect(() => {
    socket.on("receive-message", onReceiveMessage);
    socket.on("receive-join", onReceiveJoin);
    socket.on("user-joined", onUserJoined);

    return () => {
      socket.off("receive-message");
      socket.off("receive-join");
      socket.off("user-joined");
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
  useEffect(() => {
    messageEndRef.current?.scrollIntoView();
  }, [messages]);

  return (
    <div className="mt-24 mb-40 overflow-y-auto">
      {messages.map((message) => {
        // {
        //   joinMsg ? (
        //     <div>
        //       <p>{message.text}</p>
        //     </div>
        //   ) : null;
        // }
        //console.log(message);

        return message.self ? (
          <OwnMessage
            content={message.content}
            key={message.id}
            sender={message.sender.name}
            time={message.time}
            
          />
        ) : (
          <OtherUserMessage
            content={message.content}
            key={message.id}
            sender={message.sender.name}
            time={message.time}
           
          />
        );
      })}

      {joinMsg ? (
        <div className="flex justify-center">
          <p>{userName} has joined the room</p>
        </div>
      ) : null}

      {/* for scroll behaviour */}
      <div ref={messageEndRef} className="scroll-smooth" />
    </div>
  );
};

export default MessageContainer;
