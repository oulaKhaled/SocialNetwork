import React from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
 import AuthContext from "../context/AuthContext";
import { AuthProvider } from "../context/AuthContext";

const  Login=({children})=>{
 
 const navigate=useNavigate();
const {login}=useContext(AuthContext)

 
    return (
        <div className="App">  
        <header className="App-header">
      <div>
        <h1 > WELCOME  TO BLOGZ APP</h1>
        <h1 >  LOG IN </h1>
        <br/>
        <form onSubmit={login}>        
            <Form.Floating className="mb-3">
            <Form.Control
            id="floatingInputCustom"
            type="email"
            placeholder="name@example.com"
            name="email"
          />
          <label htmlFor="floatingInputCustom" style={{fontSize:"20px"}}>Email address</label>
        </Form.Floating>
        <Form.Floating>
          <Form.Control
            id="floatingPasswordCustom"
            type="password"
            placeholder="Password"
            name="password"
          />

          <label htmlFor="floatingPasswordCustom" style={{fontSize:"20px"}}>Password</label>
        </Form.Floating>
      

<br/>
          <Stack>
          
                <Button variant="secondary"  type="submit" >Log in</Button>
                <br/>
                <div>
              <h1 style={{  fontSize:"20px"}} >DON'T YOU  HAVE AN ACCOUNT? </h1>
              </div>
                <Button variant="outline-secondary" onClick={()=> 
                navigate("/register")} >Register</Button>
          </Stack>
          </form>
</div>
</header>
<AuthProvider></AuthProvider>
      </div>

    )
}
export default Login

