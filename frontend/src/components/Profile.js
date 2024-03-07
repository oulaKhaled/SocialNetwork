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
import { MDBCol,MDBBtn, MDBContainer, MDBRow, MDBCard, MDBCardText,MDBListGroupItem,MDBListGroup, MDBBreadcrumbItem,MDBBreadcrumb,MDBCardBody, MDBCardImage,MDBProgressBar, MDBTypography, MDBIcon,MDBProgress } from 'mdb-react-ui-kit';
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
import { FaFacebook, FaLinkedin,FaInstagram, FaTwitter} from "react-icons/fa";
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


          
<Navbar className="bg-body-tertiary"  bg="dark" data-bs-theme="dark" style={{
    width:"100%",
    backgroundColor:"red"
  }}>
    <Container style={{}}>
       
        <Navbar.Brand href=""><h1 style={{color:"#ffff"}} onClick={()=>{navigate("/")}}>BLOGZ</h1></Navbar.Brand>
        <Nav className="">
        <Nav.Link href="">  <h3 style={{color:"#ffff"}} onClick={()=>{navigate('profile',{state:{props2:user.user_id}})}} >profile</h3></Nav.Link>
   
         </Nav>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end" >
       
       <Navbar.Text >
           
          </Navbar.Text>
          <IoIosNotifications size={"33px"}  style={{position:"relative", left:50,color:"#ffff"}}/>
          <IoChatboxOutline  size={"33px"}  style={{position:"relative", left:70,color:"#ffff"} } onClick={()=>{navigate("/rooms")}}/>
          <Navbar.Text style={{position:"relative", left:90,color:"#ffff"}}>
          <a onClick={logout} style={{color:"#ffff"}}><h3>logout</h3></a> 
          </Navbar.Text>
      

      </Navbar.Collapse>
      </Container>
    </Navbar>
{/* ////////////////////////////////////////////////////////////////////////////////////////// */}


<section>
<MDBContainer className="py-5">
<MDBRow >
          <MDBCol lg="4" >
          {/** profile information */}
            <MDBCard  className="mb-4" >
              <MDBCardBody  className="text-center"  >

        
           {Profile && Profile.map(profile=>(
            <div style={{position:"relative",right:"190px"}} >
          
            <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                <p className="text-muted mb-1 ">{profile.username}</p>
                <p className="text-muted mb-4" >{profile.bio}</p>
                <div style={{display:"flex",flexDirection:"row",position:"relative",left:80}}>
  <p style={{marginRight:"10px"}}

> Followers {profile.get_followers_count} </p>
  <p style={{marginRight:"10px"}}> Following {profile.get_following_count}</p>


  <p style={{marginRight:"10px"}}> Post {profile.get_post_count} </p>
  </div>
  <div  >
  {profile.user ===user.user_id? <MDBBtn onClick={EditProfile}  style={{width:"100px",height:"40px"}}><p>Edit</p> </MDBBtn>
     :  <MDBBtn onClick={SendFriendRequest}  style={{width:"100px",height:"40px"}}>{button} </MDBBtn>
 }


                </div>

        </div>
           ))
           
           
           
           }

                
              </MDBCardBody>
            </MDBCard>
            {/**social network accounts */}
            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
              <div style={{position:"relative",right:"205px"}}>

                <MDBListGroup flush className="rounded-3">
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                  <FaGithub size={"30px"}  />
                    <MDBCardText>{social.github}</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                  <FaTwitter size={"30px"}  />
                    <MDBCardText>{social.twitter}</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                  <FaLinkedin size={"30px"}  />
                    <MDBCardText>{social.linkedin}</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                  <FaFacebook size={"30px"} />
                    <MDBCardText>{social.facebook}</MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                  <FaInstagram  size={"30px"} />
                    <MDBCardText>{social.instgram
}</MDBCardText>
                  </MDBListGroupItem>
                  
                </MDBListGroup>
                </div>
              </MDBCardBody>
            </MDBCard>
           
            </MDBCol>
            {/********************* Recent Post Card **************/}
            <MDBCol>
            <MDBCard>
            <MDBCol>
         
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
              
            </MDBCol>
           </MDBCard>
            </MDBCol>
           
            </MDBRow>
           
</MDBContainer>













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