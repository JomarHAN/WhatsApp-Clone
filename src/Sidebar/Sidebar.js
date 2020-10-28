import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import { ChatOutlined, SearchOutlined } from "@material-ui/icons";
import SidebarChat from "../SidebarChat/SidebarChat";
import { auth } from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import axios from "../axios";
import Pusher from "pusher-js";

function Sidebar() {
  const user = useSelector(selectUser);
  const [chats, setChats] = useState([]);
  const pusher = new Pusher("cc2254540daa48af75e4", {
    cluster: "us2",
  });

  const addChat = () => {
    const chatName = prompt("Please enter your chat name");
    axios.post("/new/chatname", {
      chatName: chatName,
    });
  };

  const newChat = () =>
    axios.get("/get/allchats").then((res) => setChats(res.data));

  useEffect(() => {
    newChat();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__user">
          <IconButton onClick={() => auth.signOut()}>
            <Avatar src={user.photo} />
          </IconButton>
          <p>{user.displayName}</p>
        </div>
        <div className="sidebar__headerRight">
          <IconButton>
            <ChatOutlined onClick={addChat} />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input type="text" placeholder="Search chat room" />
        </div>
      </div>
      <div className="sidebar__chats">
        {chats.map(({ _id, chatName }) => (
          <SidebarChat key={_id} id={_id} name={chatName} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
