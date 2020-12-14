import React, { useEffect } from "react";
import "./App.css";
import Chat from "./Chat/Chat";
import Sidebar from "./Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import Login from "./Login/Login";
import { auth } from "./firebase";
import { selectChatClick } from "./features/chatSlice";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const chatClick = useSelector(selectChatClick);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            displayName: authUser.displayName,
            email: authUser.email,
            photo: authUser.photoURL,
            uid: authUser.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);
  return (
    <div className="app">
      <div className="app__body">
        {user ? (
          <>
            <div
              className={`app__sidebar ${chatClick ? "app__sidebarOut" : ""}`}
            >
              <Sidebar />
            </div>
            <div className={`app__chat ${chatClick ? "app__chatIn" : ""}`}>
              <Chat />
            </div>
          </>
        ) : (
          <Login />
        )}
      </div>
    </div>
  );
}

export default App;
