import React from "react";
import { BrowserRouter, BrowserRouter as Router } from "react-router-dom";
import { Route,Routes } from "react-router-dom";
import Login from "./components/LoginPage";
import Register from "./components/RegisterPage";
import Home from "./components/HomePage";
import { AuthProvider } from "./context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import Rooms from "./components/Rooms";
import ChatRoom from "./components/ChatRoom";
import Profile from "./components/Profile";






function App(){
  return(
    <>
<Routes>
     <Route   path="/" element={<Home/>}   />
          <Route path="/login" element={<Login/>}   />
          <Route  path="/register" element={<Register/>}   />
          <Route path="/chat" element={<ChatRoom/>}/>
          <Route path="/rooms" element={<Rooms/>}/>
          <Route path="/rooms" element={<Rooms/>}/>
          <Route path="/profile" element={<Profile/>}/>
</Routes>

</>




);
};


export default App;