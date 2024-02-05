import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BASE_URL } from "../context/AuthContext";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const ChatRoom=()=>{
const location=useLocation();
    const [message, setmessage]=useState("");
const [newmessage,setnewMessages]=useState([])

let newdata=[];
const user2=location.state.username;
console.log();

const {user}=useContext(AuthContext);
const navigate=useNavigate(); 
const handelForm=(e)=>{
      e.preventDefault();
      setmessage(e.target.message.value)
     }

useEffect(()=>{
         if(user) {
            let url=`ws://127.0.0.1:8000/ws/chat/${user.user_id}/${user2}/`
            const chatsocket=new WebSocket(url);
            console.log(" Chat Socket connection : ",chatsocket);
        chatsocket.onmessage=function(e){
                const data=JSON.parse(e.data)
                console.log("Data :",data);
                if(data.type==="chat"){
                newmessage.push(data.message)
                setnewMessages([...newmessage])
                    }
                 
                };
          
                chatsocket.onopen=()=> chatsocket.send(JSON.stringify({
                    'message':message
                })) 
          
            }
    
    },[message])


   


// setnewMessages( newmessage=> [...newmessage,data.message]) 
    return(
        <div className="App">
        {user ?( <div> <h1> Let's Chat </h1>
            <form onSubmit={handelForm}>
            <input name="message"/>
            <ul>
             {newmessage.map((element,key)=>(
     <li key={key}>{element}</li>
 ))}
                </ul>
                </form>
                </div>
         ):( <Link to={"/"}> Home </Link>) }
            
        </div>


    );
}

export default ChatRoom;


// {newmessage.forEach(ele =>{
//     <p>{ele}</p>
//  })}


        
{/* <ul>
{Object.keys(newmessage).map((element)=>{ return <li>{element}</li>})}</ul> 
   {array.map(element=>{
            <p>{element}</p>
        })}
           <ul>
             {newmessage.map((element)=>(
     <li >{element}</li>
 ))}

 </ul>
*/}
