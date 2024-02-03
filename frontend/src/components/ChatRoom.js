import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BASE_URL } from "../context/AuthContext";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { useEffect } from "react";

const ChatRoom=()=>{

    const [message, setmessage]=useState("");
const [newmessage,setnewMessages]=useState([])
let newdata=[];


const handelForm=(e)=>{
      e.preventDefault();
      setmessage(e.target.message.value)
     
     }
    let url=`ws://127.0.0.1:8000/ws/chat/room/`

 const chatsocket=new WebSocket(url);

useEffect(()=>{ 
  
    
    chatsocket.onmessage=function(e){
            const data=JSON.parse(e.data)
            console.log("Data :" ,data);
            if(data.type==="chat"){
                // setnewMessages(prev=>[...prev,data.message])
                newmessage.push(data.message)
            setnewMessages([...newmessage])

       
            console.log(" new data :",newmessage);
          
                
                }
            };
            chatsocket.onopen=()=> chatsocket.send(JSON.stringify({
                'message':message
            })) 
           

},[message])


// setnewMessages( newmessage=> [...newmessage,data.message]) 
    return(
        <div className="App">
            <h1> Let's Chat </h1>
            <form onSubmit={handelForm}>
            <input name="message"/>
            <ul>
             {newmessage.map((element,key)=>(
     <li key={key}>{element}</li>
 ))}

 </ul>
             </form>
          
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
