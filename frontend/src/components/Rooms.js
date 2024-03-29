import React from "react";
import { useEffect,useState } from "react";
import { BASE_URL } from "../context/AuthContext";
import Login from "./LoginPage";
import { Link } from "react-router-dom";
import AuthContext  from "../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
const Rooms=()=>{
    const navigate=useNavigate();
    const [users,setUser]=useState([]);
    const {user,authToken}=useContext(AuthContext)
const getUsers= async ()=>{
try{
  let response2 = await fetch(`${BASE_URL}profile/user/`,{
    method:"GET",
    headers:{
        "Authorization":`Bearer ${authToken.access}`,
        "Content-Type":"application/json"}
    })
    console.log("rsponse2 : ",response2.status);
  
      const data= await response2.json();
      setUser(data)
      console.log("USERS : ",users);

  }
  catch(error){
    console.log(error);

  }

}

useEffect(()=>{
     getUsers()
 
},[])
useEffect(()=>{
    console.log("user",users);
    console.log("USER ",user);
   
},[users])
      

 let value=Object.values(users);


return (
        <>
        <div className="App">
        <header className="App-header">
        <h1>Welcome to Rooms Page</h1>
       

        </header>
        </div>
        <div style={{top:100,position:"absolute"}}>
        <ul >
          { users &&  users.map(user1=>(
            user.user_id !== user1.id && 
            <li   onClick={()=>{navigate("/chat",{state:user1.id})}}>
      <h1 >{user1.username}</h1></li>))
          }
         
        </ul>
        </div>
        
        </>
    );

}
export default Rooms;
