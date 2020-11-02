import { Avatar } from "@material-ui/core";
import axios from "../axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setChatRoom } from "../features/chatSlice";
import "./SidebarChat.css";
import Pusher from "pusher-js";
import { format } from "timeago.js";

function SidebarChat({ id, name }) {
  const dispatch = useDispatch();
  const [lastMsg, setLastMsg] = useState("");
  const [lastTimestamp, setLastTimestamp] = useState("");
  const [lastPhoto, setLastPhoto] = useState("");
  const pusher = new Pusher("cc2254540daa48af75e4", {
    cluster: "us2",
  });

  const getLastData = () => {
    axios.get(`/get/lastMsg?chatId=${id}`).then((res) => {
      if (res.data.user) {
        setLastMsg(res.data.message);
        setLastTimestamp(res.data.timestamp);
        setLastPhoto(res.data.user.photo);
      }
    });
  };

  useEffect(() => {
    getLastData();
    const channel = pusher.subscribe("messages");
    channel.bind("newMessage", function () {
      getLastData();
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [id]);

  return (
    <div
      className="sidebarChat"
      onClick={() =>
        dispatch(
          setChatRoom({ chatId: id, chatName: name, chatTime: lastTimestamp })
        )
      }
    >
      <Avatar src={lastPhoto} />
      <div className="sidebarChat__info">
        <h2>{name}</h2>
        <p>{lastMsg}</p>
        <small>{format(lastTimestamp)}</small>
      </div>
    </div>
  );
}
export default SidebarChat;
