import SendMessageForm from "@/components/SendMessageForm";
import MessageContainer from "@/components/containers/MessageContainer";
import Navbar from "@/components/Navbar";

const ChatContainer = ({ user, roomId }) => {
  return (
    <div>
      <Navbar userName={user.name} roomId={roomId} />
      <MessageContainer />
      <SendMessageForm user={user} roomId={roomId} />
    </div>
  );
};

export default ChatContainer;
