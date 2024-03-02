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
import { MDBCol,MDBBtn, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import PostCard from "./PostCard";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { Card, CardBody,Button,Table } from "react-bootstrap";

import { useLocation,useParams } from "react-router-dom";

const Profile=()=>{
const {user,authToken,logout}=useContext(AuthContext)
const[Profile,setProfile]=useState([])
const[Post,setPost]=useState([])
let navigate=useNavigate();

const location=useLocation();
const Id =location.state.props2;
let postIds=[];



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

}
const updatePost=async()=>{

}


// const getSocialAccounts= async()=>{
//     let response=await fetch(`${BASE_URL}`)

// }


useEffect(()=>{

    getPosts()
    console.log("posts :",Post);
},[])



    return(
      <div  >
        <IoMdArrowRoundBack size={"50px"}  onClick={()=>{navigate("/")}}/>
  <Card style={{padding:"5px",width:"1000px",height:"auto",bottom:"50%",top:"50%", margin :" 0 auto ",borderRadius:"2rem"}}>

  {Profile && Profile.map(profile=>(
  <>
  <div style={{backgroundColor:"red",padding:"10px"}}>
        for image 
        <img/>
        </div>
    <div style={{position:"relative",top:400,alignItems:"cneter",left:50}} >
    
       
   
    <Card.Title >
    {profile.username}
  </Card.Title>

 {/** fetch to another social accounts */}

  <div style={{display:"flex",flexDirection:"row",position:"relative"}}>
  <Card.Text style={{marginRight:"10px"}}

> Followers {profile.get_followers_count}</Card.Text>

  <Card.Text style={{marginRight:"10px"}}>  Following {profile.get_following_count}</Card.Text>

  <Card.Text style={{marginRight:"10px"}}> Post {profile.get_post_count}</Card.Text>
  </div>


  <Card.Text >{profile.bio}</Card.Text>
  <Button variant="outline-dark" style={{width:"300px",padding:"2px",alignItems:"center",justifyContent:"center"}}> {profile.user ===user.user_id?<p> Edit profile </p>: <p>Follow</p>}</Button>{' '}
  </div>
  </>
  ))}


  {/* <h1 style={{position:"relative",top:"90px", margin:"5px"}}> Recent Posts</h1> */}
  <div  className="social-card" >
<h5 style={{paddingBottom:"10px"}}> Contect information </h5>
<div style={{display:"flex",flexDirection:"row"}}>

<h5>
    field name
</h5>
<br/>
<div style={{paddingLeft:"70px"}}>
<h5 >field Value</h5>
</div>

</div>
</div>


<div style={{width:"600px",height:"900px",position:"relative",left:400,bottom:400}}>
<h1 style={{position:"relative",left:150,top:50}}>REACENT POST</h1>
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
</div>


  </Card>

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