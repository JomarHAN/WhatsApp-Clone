import { Avatar } from "@material-ui/core";
import { InsertEmoticon, MicOutlined } from "@material-ui/icons";
import React from "react";
import "./Chat.css";

function Chat() {
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3>Room Name</h3>
          <p>
            Last seen at: <span>few minutes ago</span>
          </p>
        </div>
      </div>
      <div className="chat__body">
        <div className="chat__message">
          <span className="chat__userName">Jomar</span>
          hello world, I am jomar Nguyen, from Georgia hello world, I am jomar
          Nguyen, from Georgia hello world, I am jomar Nguyen, from Georgia
          <span className="chat__timestamp">
            <small>just now</small>
          </span>
        </div>
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input type="text" placeholder="Type a message" />
          <button>Send</button>
        </form>
        <MicOutlined />
      </div>
    </div>
  );
}
export default Chat;
