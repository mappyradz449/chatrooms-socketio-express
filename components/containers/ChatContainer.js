import SendMessageForm from "@/components/SendMessageForm";
import MessageContainer from "@/components/containers/MessageContainer";
import Navbar from "@/components/Navbar";

const ChatContainer = () => {
  return (
    <div>
      <Navbar />
      <MessageContainer />
      <SendMessageForm />
    </div>
  );
};

export default ChatContainer;
