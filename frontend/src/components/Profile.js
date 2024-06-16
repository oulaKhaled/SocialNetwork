import React, { useEffect, useState }  from "react";
import Nav from 'react-bootstrap/Nav';
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row'
import { BASE_URL } from "../context/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart,faComment } from '@fortawesome/free-solid-svg-icons'

import PostCard from "./PostCard";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useFetcher, useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { Card, CardBody,Button } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { useLocation,useParams } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import { IoChatboxOutline } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";
import { FaGithub } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { FaFacebook, FaLinkedin,FaInstagram, FaTwitter} from "react-icons/fa";
import Header from "./header";
const Profile=()=>{
const {user,authToken,logout}=useContext(AuthContext)
const[Profile,setProfile]=useState([])
const[Post,setPost]=useState([])
let navigate=useNavigate();

const location=useLocation();
const Id =location.state.props2;
let postIds=[];

const [social,getSocial]=useState([]);
const [button,setbutton]=useState("follow")

console.log(" Profile User :",user.user_id);


let getProfile= async ()=>{
    let response= await fetch(`${BASE_URL}profile/profile/${Id}/`,{
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


const SendFriendRequest= async()=>{
  if(button==="follow"){
    let response=await fetch(`${BASE_URL}profile/friendRequest/send_friend_request/`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${authToken.access}`
      },
      body:JSON.stringify({"sender":user.user_id,"reciver":Id})
    
    })
    let data= await response.json();
    setbutton("requested");
    console.log("DATA : ",data);

  }
  else if(button==="followed"){
    // delete request recored, delete the user recored form following table
    // setButton("follow")
  
  }
  else if (button==="requested"){
    // send delete request 
    // setButton as follow 
  }

}





const EditProfile=()=>{


}




let getPosts= async()=>{

    let response =await fetch(`${BASE_URL}profile/profile/${Id}/get_post/`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${authToken.access}`,
       
          }
    })
    let data=await response.json()
    setPost(data)
   console.log("data : ",data);
   console.log("post: ",Post);

}
useEffect(()=>{

    getProfile()
},[])

useEffect(()=>{
    console.log(" Profile :",Profile);
},[Profile])

const deletePost= async()=>{
  

    let response =await fetch(`${BASE_URL}post/${Id}/`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${authToken.access}`,
       
          }
    })
    let data=await response.json()
   if(data){
    console.log("You deleted post successfully :");
   }

}
const updatePost=async()=>{

}


const getSocialAccounts= async()=>{
   
    let response=await fetch(`${BASE_URL}profile/social/?user_id=${Id}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${authToken.access}`,

      },
    
      
    })
    let data= await response.json();
    if(data){
      getSocial(data);
    }
      

}


useEffect(()=>{
  getSocialAccounts();
},[]);
useEffect(()=>{

    getPosts()
    console.log("posts :",Post);
},[])


useEffect(()=>{
console.log("Social Acoounts : ",social);
},[social])


    return(
      <div  >
<Header/>
        <h1> This Profile page</h1>  

{/* ////////////////////////////////////////////////////////////////////////////////////////// */}


<section>

         
            {Post && Post.map(post=>(
              <PostCard
        
        author_username={post.author_username}
       content={post.content}
       comments_count={post.comments_count}
       likes_count={post.likes_count}
       date={post.date}
       author={post.author}
       posts={Post}
       id={post.id}
      
     
       
    />
            ))}
              
 













</section>
  </div>
        )};

export default Profile;

// <h1>
//             Profile <br/>
//              {
//              ))}</h1>
/* <div className="App">
            <header className="App-Header">

           <div className="container"></div>

           </header>
        </div>
</div>
   */


// <MDBRow>
// {Post && Post.map(post=>(
//   <><MDBCol className="mb-2">
//         <MDBTypography tag='h3'>{post.content}</MDBTypography>
//     </MDBCol>
//     </>
// ))}

// </MDBRow>}