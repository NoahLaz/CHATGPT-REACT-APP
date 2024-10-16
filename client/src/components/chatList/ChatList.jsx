import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ChatService from "../../services/chatService";
import "./chatList.css";

const ChatList = () => {
  const [chats, setChats] = useState([]);

  const getAllChats = async () => {
    try {
      const { data } = await ChatService.getAll();
      setChats(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllChats();
  }, []);

  return (
    <div className="chatList">
      <span className="title">DASHBOARD</span>
      <Link to={"/dashboard"}>New Chat</Link>
      <Link to={"/"}>Explore</Link>
      <Link to={"/"}>Contact</Link>
      <hr />
      <span className="title">RECENT CHATS</span>
      <div className="link">
        {chats?.map((item, index) => {
          return (
            <Link key={index} to={`/dashboard/chats/${item._id}`}>
              {item.title.substring(0, 30) + "..."}
            </Link>
          );
        })}
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
