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
   
},[users])
      

 let value=Object.values(users);


return (
        <>
        <div className="App">
        <header className="App-header">
        <h1>Welcome to Rooms Page</h1>
        <ul>
          { users && users.map(user=>(
          <li >{user.username}</li>))}
        </ul>

        </header>
        </div>
        </>
    );

}
export default Rooms;
{/* {state:{username:item[Object.keys(item)[0]]}}) */}


// {item[Object.keys(item)[9]]}

// {value.map((item,key)=> (
//   <div>      
// <br/>
//   <button key={key} onClick={()=> navigate("/chat",)}>
//   <p key={key}>

//   </p>
//   </button>
//   </div> ))
//    }

// {user[Object.keys(user)[9]]}