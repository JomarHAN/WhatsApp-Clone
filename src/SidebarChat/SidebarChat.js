import { Avatar } from "@material-ui/core";
import React from "react";
import "./SidebarChat.css";
function SidebarChat() {
  return (
    <div className="sidebarChat">
      <Avatar />
      <div className="sidebarChat__info">
        <h2>Room Name</h2>
        <p>
          This is the last messageThis is the last message This is the last
          messageThis is the last message
        </p>
        <small>timestamp</small>
      </div>
    </div>
  );
}
export default SidebarChat;
