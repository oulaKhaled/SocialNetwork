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
import { Card, CardBody } from "react-bootstrap";


const Profile=()=>{
const {user,authToken,logout}=useContext(AuthContext)
const[Profile,setProfile]=useState([])
const[Post,setPost]=useState([])
let navigate=useNavigate();



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



let getPosts= async()=>{

    let response =await fetch(`${BASE_URL}profile/profile/${user.user_id}/get_post/`,{
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

const deletePost= async()=>{

}
const updatePost=async()=>{

}


const getSocialAccounts= async()=>{
    
}


useEffect(()=>{

    getPosts()
    console.log("posts :",Post);
},[Profile])



    return(
      <div  >
        <IoMdArrowRoundBack size={"50px"}  onClick={()=>{navigate("/")}}/>
  <Card style={{padding:"70px",width:"1000px",height:"600px",alignItems:"center",bottom:"50%",top:"50%", margin :" 0 auto ",}}>
 
  {Profile && Profile.map(profile=>(
  <>
    <div >
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
  </div>
  </>
  ))}
  {/* <h1 style={{position:"relative",top:"90px", margin:"5px"}}> Recent Posts</h1> */}
  



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