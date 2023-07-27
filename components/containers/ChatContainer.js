import SendMessageForm from "@/components/SendMessageForm";
import MessageContainer from "@/components/containers/MessageContainer";

const ChatContainer = () => {
  return (
    <div>
      <MessageContainer />
      <SendMessageForm />
    </div>
  );
};

export default ChatContainer;
