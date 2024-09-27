import { Link } from "react-router-dom";
import "./chatList.css";

const ChatList = () => {
  return (
    <div className="chatList">
      <span className="title">DASHBOARD</span>
      <Link to={"/"}>New Chat</Link>
      <Link to={"/"}>Explore</Link>
      <Link to={"/"}>Contact</Link>
      <hr />
      <span className="title">RECENT CHATS</span>
      <div className="link">
        <Link to={"/"}>Chat Title</Link>
        <Link to={"/"}>Chat Title</Link>
        <Link to={"/"}>Chat Title</Link>
        <Link to={"/"}>Chat Title</Link>
        <Link to={"/"}>Chat Title</Link>
        <Link to={"/"}>Chat Title</Link>
      </div>
      <hr />
      <div className="upgrade">
        <img src="/logo.png" alt="" />
        <div className="texts">
          <span>Upgrade to Pro Version</span>
          <span>Get Unlimited Chats</span>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
