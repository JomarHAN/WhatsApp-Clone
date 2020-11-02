import React, { forwardRef } from "react";
import "./Message.css";
import moment from "moment";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { format } from "timeago.js";

const Message = forwardRef(
  ({ message, timestamp, id, user: { displayName, email } }, ref) => {
    const user = useSelector(selectUser);
    return (
      <div
        ref={ref}
        className={`message ${user.email === email && "message__sender"}`}
      >
        <span className="message__userName">{displayName}</span>
        {message}
        <span className="message__timestamp">
          <small>{format(timestamp)}</small>
        </span>
      </div>
    );
  }
);
export default Message;
