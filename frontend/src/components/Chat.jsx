import '../styles/Chat.css';
import LiveChat from './LiveChat';

const Notifications = () => {
  return (
    <div className="notifications">
      {/* Add notification components here */}
    </div>
  );
};

const Conversations = () => {
  return (
    <div className="conversations">
      {/* Add conversation list items here */}
    </div>
  );
};

const ChatWindow = () => {
  return (
    <div className="chat-window">
      <LiveChat/>
    </div>
  );
};

const Chat = () => {
  return (
    <div className="chat-container">
      <Notifications />
      <div className="main-content">
        <Conversations />
        <ChatWindow />
      </div>
    </div>
  );
};

export default Chat;