import React from "react";
import { useEffect,useState } from "react";
import { BASE_URL } from "../context/AuthContext";
import Login from "./LoginPage";
import { Link } from "react-router-dom";

const Rooms=()=>{
    const [user,setUser]=useState([]);


   const getUsers= async ()=>{
  let response2 =  await fetch(`${BASE_URL}profile/user/`,{
    method:"GET",
    headers:{
        "Content-Type":"application/json"}
    })
    const data= await response2.json();
    setUser(data);


}

useEffect(()=>{
    getUsers()
},[])
      

let value=Object.values(user);

return (
        <>
        <h1>Welcome to Rooms Page</h1>
       <ul> {value.map((item,key)=> (<Link to={"/chat"} key={key}> <li key={key}>{item[Object.keys(item)[9]]}</li></Link>
         ))}
        </ul>
       
        </>
    );

}
export default Rooms;
