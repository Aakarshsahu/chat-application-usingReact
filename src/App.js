import React, { useState } from "react";
import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Register";
import { LoginContext } from "./LoginContext";
import Login from "./Login";

export default function App() {
  const [userLogin, setUserLogin] = useState(false);
  const [userName, setUserName] = useState("");
  return (
    <BrowserRouter>
      <div className="app">
        <LoginContext.Provider value={{ setUserLogin, setUserName }}>
          {!userLogin ? (
            <div className="register_login">
              <Routes>
                <Route path="/" element={<Register />}></Route>
                <Route path="/login" element={<Login />}></Route>
              </Routes>
            </div>
          ) : (
            <div className="appBody">
              <Sidebar userName={userName} />
              <Routes>
                <Route path="/" element={<Chat userName={userName} />}></Route>
                <Route
                  path="/group/:groupId"
                  element={<Chat userName={userName} />}
                ></Route>
              </Routes>
            </div>
          )}
        </LoginContext.Provider>
      </div>
    </BrowserRouter>
  );
}
