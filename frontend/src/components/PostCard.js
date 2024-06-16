import React from "react";
import { CiHeart } from "react-icons/ci";
import { GoComment } from "react-icons/go";
import { LuSend } from "react-icons/lu";
import { CiBookmark } from "react-icons/ci";
import { IoIosMore } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import Home from "./HomePage";
import { FaComment } from "react-icons/fa";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaRegComment } from "react-icons/fa6";
import { useEffect,useState } from "react";
import { BASE_URL } from "../context/AuthContext";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import { Card,Button } from "react-bootstrap";
import { IoMdSend } from "react-icons/io";




const imageUrl=``

const PostCard=(props)=>{

  const[comments,SetComments]=useState([]);
  const navigate=useNavigate();
  const {authToken,user}=useContext(AuthContext);
  const postIds=[];
  const [newComment,setNewComment]=useState([]);
  let [like,setlike]=useState(props.likes_count)
//  let like =props.likes_count

  // const {image}=props
// console.log("image props : ",props.image);
  

const HandelClick=()=>{
  navigate("/profile",{state:{props2:props.author}})
  console.log("props.author",props.author);
}
// to get related comments to the post 
const get_related_commnts=async(id)=>{
  let response=await fetch(`${BASE_URL}post/${id}/get_related_comments/`,{
      method:"GET",
      headers:{
        
          "Content-Type":"application/json",
          "Authorization":`Bearer ${authToken.access}`

      }
  })
  let data=  await response.json()
  console.log("fetched comments : ",data);  
   
  if (Array.isArray(data)){
    SetComments(prev=>[...prev,...data])

      }

  // console.log(`related comments ${data} for each post ${id}  `)

}

const get_post_id= async()=>{
// props.posts.map(post=>(
// postIds.push(post.id)
// ))

    postIds.push(props.id)

    for (let i=0;i<postIds.length;i++){

    try{

    await get_related_commnts(postIds[i])

    }
    catch{
    console.log("there is no comment");
    }

    }

}

useEffect(()=>{

  console.log("get post_id method is called :");
  
  get_post_id()
  
  
  },[])
  



const handelForm=(evt)=>{

setNewComment(evt.target.value)
}
// const HandelnewComment=()=>{
//   console.log(newComment);
//   console.log("props.id",props.id);
// }
const AddComment= async(e)=>{


    let response = await fetch(`${BASE_URL}comment/`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${authToken.access}`
  
      },
      body:JSON.stringify({"content":newComment,"user_id":user.user_id,"post":props.id,"like":0})
    })
    let data= await response.json()
    if( response.ok){
      console.log(" new commetn created :" ,data);
     SetComments([...comments,data])
    }

  }


const AddLike= async(e)=>{
e.preventDefault()

    let response = await fetch(`${BASE_URL}like/`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${authToken.access}`
  
      },
      body:JSON.stringify({"post_id":props.id,"user_id":user.user_id})
    })
    let data= await response.json()
    if( response.ok){
     setlike(++like)
     
     
    }

  }
 
  const deletePost= async()=>{
  

    let response =await fetch(`${BASE_URL}post/${props.id}/`,{
        method:"DELETE",
        headers:{
           
            "Authorization":`Bearer ${authToken.access}`,
       
          }
    })
   
    if(response.ok){
    window.location.reload();
    }
  
}

return(
      <div className="con">

{/*  `..`+props.image        //  image={require(post.image!==null ? `..`+post.image:"../images/picture.jpg" )}
  <img src={props.image} alt="image"/>    src={require('../images/picture.jpg')}}*/ }
        <div className="card-container">
        { props.image?<img   src={`http://localhost:8000${props.image}`}  />:null
        }
        
       
        <p className="card-description">{props.date}</p>
        <h3 className="card-title" onClick={HandelClick}> {props.author_username}</h3>
        <p className="card-description">{props.content}</p>
      
       <div>
       <div style={{ margin:"15px",display:"flex",
  flexDirection: "row", 
  justifyContent: "flex",}}>
        <CiHeart size={"37px"} style={{position:"relative",top:25,BackgroundColor:"red"}} onClick={AddLike}/> <h6 style={{position:"relative ",top:25,margin:"5px",right:5,}} >{like}</h6>
        <FaRegComment size={"30px"} style={{top:25,position:"relative"}}/><h6 style={{position:"relative ",top:25,margin:"5px"}} >{props.comments_count}</h6>
       
        {/* <CiBookmark size={"37px"}/> */}
            
        </div>
        <form>
        <Button variant="dark" style={{width:"auto",margin:"5px"}} onClick={AddComment} >post

 </Button>
        <input placeholder="add comment" class="input-comment" name="text" onChange={handelForm}  /> 
       <Button onClick={deletePost}>Delete my post</Button>
</form>
       </div>
      {/**all comments must be displayed here */}
      {comments && comments.map((comment,key)=>(
        comment.post===props.id? <Card key={key} 
        style={{backgroundColor:"#EBF3E8", borderRadius: "1rem",margin:"8px",height:"auto"}} >
        <div style={{display:"flex",flexDirection:"row",}}>
        <Card.Text style={{position:"relative",top:10,left:10}}><h5>{comment.get_username} </h5> </Card.Text>
        <p style={{ padding:"10px",marginLeft:"5px"}}>{comment.date}</p>
        </div>
          <Card.Text style={{position:"relative",bottom:15,left:10}}>{comment.content}</Card.Text>

       
         
        </Card> : null
      ))
      }
</div>
  </div>
    );
}
export default PostCard;

//<IoMdSend />