import React from "react";
import { BrowserRouter, BrowserRouter as Router } from "react-router-dom";
import { Route,Routes } from "react-router-dom";
import Login from "./components/LoginPage";
import Register from "./components/RegisterPage";
import Home from "./components/HomePage";
import { AuthProvider } from "./context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"

import ChatRoom from "./components/ChatRoom";

function App(){
  return(
    <>
<Routes>
     <Route   path="/" element={<Home/>}   />
          <Route path="/login" element={<Login/>}   />
          <Route  path="/register" element={<Register/>}   />
          <Route path="/chat" element={<ChatRoom/>}/>
</Routes>

</>




);
};


export default App;