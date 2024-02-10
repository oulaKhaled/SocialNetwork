import React, { useEffect, useState }  from "react";
import Nav from 'react-bootstrap/Nav';
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row'
import { BASE_URL } from "../context/AuthContext";


const Profile=()=>{
const {user,authToken,logout}=useContext(AuthContext)
const[Profile,setProfile]=useState([])
console.log(" Profile User :",user.user_id);


let getProfile= async ()=>{
    let response= await fetch(`${BASE_URL}profile/profile/${user.user_id}/`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${authToken.access}`,
        }
    })
    let data= await response.json()
    if(response.status===200){
        setProfile(data)
        
    }
   
}
useEffect(()=>{

    getProfile()
},[])


const getSocialAccounts= async()=>{
    
}


useEffect(()=>{
    console.log("Profile :",Profile);
},[Profile])



    return(
        <div>
          
        <div className="App">
            <header className="App-Header">
            <h1> Profile Page {user.username}  </h1>
           <div className="container">
           
               </div>
            </header>
        </div>
</div>
  
        )};

export default Profile;