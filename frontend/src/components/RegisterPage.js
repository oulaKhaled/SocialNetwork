import React from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register=()=>{
const navigate=useNavigate();
const BASE_URL="http://127.0.0.1:8000/";
const [newuser,setNewUser]=useState({
   "first_name":"",
    "last_name":"",
    "password":"",
    "email":"",
    "username":"",
});

const handelInputChange=(evt)=>{
    setNewUser((prev)=> ({...prev,[evt.target.name]:evt.target.value}));
}



const handelClick=(e)=>{
  e.preventDefault();
    fetch(`${BASE_URL}profile/register/`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(newuser)
    }).then(response=>{
      if(response.statusText==="Created")
    {
      console.log("New user Created");
     navigate("/login");

    }
  else{
    console.log("Bad request");
  }}
    )
    .then(newuser=>{
        console.log(newuser);
     
    })
    
    .catch(error=>{
        console.log(error);
    })

    }




  return(

        <div className="App">
            <header className="App-header">
        <div>
      
            <h1>  
           YOU CAN REGISTER HERE </h1>
            <br/>
    <Form.Floating className="mb-3">
        <Form.Control
          id="floatingInputCustom"
          type="email"
          placeholder="name@example.com"
          name="email"
          onChange={handelInputChange}
          value={newuser.email}
        />
        <label htmlFor="floatingInputCustom" style={{fontSize:"20px"}}>Email address</label>
      </Form.Floating>
      <br/>
      <Form.Floating>
      <Form.Control
          id="floatingInputCustom"
          name="first_name"
          onChange={handelInputChange}
          value={newuser.first_name}

        />
        <label htmlFor="floatingInputCustom" style={{fontSize:"20px"}}>First name</label>
      </Form.Floating>
      <br/>
      <Form.Floating>
      <Form.Control
          id="floatingInputCustom"
          name="last_name"
          onChange={handelInputChange}
          value={newuser.last_name}
        />
        <label htmlFor="floatingInputCustom" style={{fontSize:"20px"}}>Last name</label>
      </Form.Floating>
      <br/>
      <Form.Floating>
      <Form.Control
          id="floatingInputCustom"
          onChange={handelInputChange}
          name="username"
          value={newuser.username}
        />
        <label htmlFor="floatingInputCustom" style={{fontSize:"20px"}}>Username</label>
      </Form.Floating>
      <br/>
      <Form.Floating>
        <Form.Control
          id="floatingPasswordCustom"
          type="password"
          placeholder="Password"
          name="password"
          onChange={handelInputChange}
          value={newuser.password}
        />
        <label htmlFor="floatingPasswordCustom" style={{fontSize:"20px"}}>Password</label>
      </Form.Floating>
<br/>
      <Stack gap={2}>
      <Button variant="primary" onClick={handelClick}>Register</Button>
      <div>
     <h1 style={{  fontSize:"20px"}} >ALREADY HAVE AN ACCOUNT? </h1>
     </div>
      <Button variant="primary" onClick={()=>{
  return navigate("/login");

}} >Login</Button>
</Stack>
</div>
            </header>
        </div>


    )
}

export default Register
