import { Avatar } from "@material-ui/core";
import { InsertEmoticon, MicOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectChatId,
  selectChatName,
  selectChatTime,
} from "../features/chatSlice";
import Message from "../Message/Message";
import "./Chat.css";
import axios from "../axios";
import { selectUser } from "../features/userSlice";
import Pusher from "pusher-js";
import FlipMove from "react-flip-move";
import * as timeago from "timeago.js";

function Chat() {
  const chatName = useSelector(selectChatName);
  const [input, setInput] = useState("");
  const chatId = useSelector(selectChatId);
  const user = useSelector(selectUser);
  const [messages, setMessages] = useState([]);
  const chatTime = useSelector(selectChatTime);

  const pusher = new Pusher("PUSHER_KEY", {
    cluster: "us2",
  });

  const sendMessage = (e) => {
    e.preventDefault();
    axios.post(`/new/message?_id=${chatId}`, {
      message: input,
      user: user,
      timestamp: Date.now(),
    });
    setInput("");
  };

  const getNewMsg = () =>
    axios
      .get(`/get/chatroom?chatId=${chatId}`)
      .then((res) => setMessages(res.data[0].conversation));

  useEffect(() => {
    getNewMsg();
    const channel = pusher.subscribe("messages");
    channel.bind("newMessage", () => {
      getNewMsg();
    });
    return () => {
      channel.unsubscribe();
      channel.unbind_all();
    };
  }, [chatId]);

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3>{chatName}</h3>
          <p>
            Last seen at: <span>{timeago.format(chatTime)}</span>
          </p>
        </div>
      </div>
      <div className="chat__body">
        <FlipMove>
          {messages.map(({ message, _id, timestamp, user }) => (
            <Message
              key={_id}
              id={_id}
              timestamp={timestamp}
              user={user}
              message={message}
            />
          ))}
        </FlipMove>
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message"
          />
          <button onClick={sendMessage}>Send</button>
        </form>
        <MicOutlined />
      </div>
    </div>
  );
}
export default Chat;
