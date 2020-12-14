import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import {
  Avatar,
  Button,
  FormControl,
  IconButton,
  makeStyles,
  Modal,
  TextField,
} from "@material-ui/core";
import { ChatOutlined, SearchOutlined } from "@material-ui/icons";
import SidebarChat from "../SidebarChat/SidebarChat";
import { auth } from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import axios from "../axios";
import Pusher from "pusher-js";
import FlipMove from "react-flip-move";
import { selectChatClick } from "../features/chatSlice";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 300,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Sidebar() {
  const user = useSelector(selectUser);
  const [chats, setChats] = useState([]);
  const [newChatName, setNewChatName] = useState("");
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const pusher = new Pusher("PUSHER_KEY", {
    cluster: "us2",
  });

  const addChat = (e) => {
    e.preventDefault();
    axios.post("/new/chatname", {
      chatName: newChatName,
    });
    setOpen(false);
    setNewChatName("");
  };

  const handleClose = () => {
    setOpen(false);
    setNewChatName("");
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <form>
        <FormControl>
          <TextField
            value={newChatName}
            onChange={(e) => setNewChatName(e.target.value)}
            label="New Chat Name"
          />
          <Button type="submit" onClick={addChat} className="addChatBtn">
            Create
          </Button>
        </FormControl>
      </form>
    </div>
  );

  const newChat = () =>
    axios.get("/get/allchats").then((res) => setChats(res.data));

  useEffect(() => {
    newChat();
    const channel = pusher.subscribe("chats");
    channel.bind("newChat", () => {
      newChat();
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
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
        <Modal open={open} onClose={handleClose}>
          {body}
        </Modal>
        <div className="sidebar__headerRight">
          <IconButton>
            <ChatOutlined onClick={() => setOpen(true)} />
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
        <FlipMove>
          {chats.map(({ _id, chatName }) => (
            <SidebarChat key={_id} id={_id} name={chatName} />
          ))}
        </FlipMove>
      </div>
    </div>
  );
}

export default Sidebar;
