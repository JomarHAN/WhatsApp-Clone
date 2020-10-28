import React from "react";
import "./Message.css";
import moment from "moment";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { format } from "timeago.js";

function Message({ message, timestamp, id, user: { displayName, email } }) {
  const user = useSelector(selectUser);
  return (
    <div className={`message ${user.email === email && "message__sender"}`}>
      <span className="message__userName">{displayName}</span>
      {message}
      <span className="message__timestamp">
        <small>{format(timestamp)}</small>
      </span>
    </div>
  );
}

export default Message;
