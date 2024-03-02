import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useEffect, useState } from 'react';
// import { AuthProvider } from './components/LoginPage';
import AuthContext from '../context/AuthContext';
import { AuthProvider } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Login from './LoginPage';
import { BASE_URL } from '../context/AuthContext';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Stack from 'react-bootstrap/esm/Stack';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAtom,faHeart,faComment,faMessage,faFile } from '@fortawesome/free-solid-svg-icons'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import PostCard from './PostCard';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { FaDirections } from 'react-icons/fa';
import Profile from './Profile';
import { IoIosNotifications } from "react-icons/io";
import { IoChatboxOutline } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";
import { useRef } from 'react';






function Home({ children }) {
  const navigate = useNavigate();
  const [following, setFollowing] = useState([]);
  const followingIds = [];
  const [newpost,setNewPost]=useState({
    "content":"",
    "image":""
  })

  let  firstRender=useRef(true);

  
const postIds=[];

  const { user, logout, authToken } = useContext(AuthContext);
  let Getposts = [];

  const [posts, SetPosts] = useState([]);
  const[comments,SetComments]=useState([]);
  const [newComment,setNewComment]=useState([]);

  ///////////////method to get the following for user//////////////////
  const getFollowing = async () => {
   if(authToken){
      console.log("TOKEN : ", authToken.access);
      try {
        let response = await fetch(`${BASE_URL}profile/following/`, {
          method: "GET",
          headers: {

            "Content-Type": "application/json",
            "Authorization": `Bearer ${authToken.access}`,

          }
        })
        let data = await response.json()
        console.log("FOLLOWİNG DATA :",data);
        setFollowing(data)
      } catch (error) {
        console.log(error);
      }}
      else{
        console.log("error");
      }
      
    }
  
    //   navigate("/login")
    // }
  
    useEffect(() => {
      console.log("get following method will get call before :",following);
      getFollowing()
    
  
    }, [])

    


//////////// get related post for following/////////////

  const getPost = async (id) => {
    let response = await fetch(`${BASE_URL}post/${id}/get_post_author/`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${authToken.access}`,
        "Content-Type": "application/json"
      },

    })
    let data = await response.json()
    console.log("Fetched Posts for user : ", id, " Data : ", data);
    if (Array.isArray(data)){
    SetPosts(prev => [...prev, ...data])
    }
  }


  const getAllPosts = async () => {
    following.map(item => (
      followingIds.push(item.following)
    ))
    // followingIds.push(user.user_id)
    // console.log("following",following);
    for (let i = 0; i<followingIds.length;i++) {
      const Ids = followingIds[i]
      try {
        await getPost(Ids)
        
      }
      catch(error) {
        console.log(error);

      }
    }
    firstRender.current=true;
  }
    
    
  
  useEffect(()=>{
 
      if(firstRender.current){
     firstRender.current=false;
     return;
   
    }
    console.log(" Get all post method will get called"); 
    

    getAllPosts()  

      },[following])

    





////////////new post //////////////////
const newPost= async ()=>{
  let response= await fetch(`${BASE_URL}post/`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Authorization":`Bearer ${authToken.access}`
    },
    body:JSON.stringify({"content":newpost.content,"image":newPost.image,"author":user.user_id})
  })
  let data = await response.json()
  console.log("new Post response ",data);
  
  }
  
  const handelNewPost=(e)=>{
    if(e.target.name==="content"){
      setNewPost(prev=>({
        ...prev,
       content: e.target.value}))
    }
    else{
  setNewPost(
    prev=>({
      ...prev,
      image :e.target.value}))
    }
  
  }
  const HandelClick=(e)=>{
    console.log("new post : ",newpost);
    newPost()
      
    }
  
   
      
  const AddLike=async()=>{
  
  }
  

  

  return (
    <div style={{alignItems:"center"}}>
      {user &&
      
   <div style={{width :"100%"}}>
  
    
<Navbar className="bg-body-tertiary" style={{
    width:"100%"}}>
    <Container>
        <Navbar.Brand href="#home">
        <div style={{flexDirection:"row",display:"flex"}}>
          <button className="btn-23" >
            <span className="text">BLOGZ</span>
  <span  className="marquee">BLOGZ</span>
</button>
<div className="input-container">
  <input type="text" id="input" required=""/>
  <label className="label">Search</label>
  <div className="underline"></div>
</div>


</div>


</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
       
       <Navbar.Text >
           <a onClick={()=>{navigate("/profile",{state:{props2:user.user_id}})}}><h1>{user.username}</h1></a>
          </Navbar.Text>
          <IoIosNotifications size={"33px"}  style={{position:"relative", left:50}}/>
          <IoChatboxOutline  size={"33px"}  style={{position:"relative", left:70} } onClick={()=>{navigate("/rooms")}}/>
          <Navbar.Text style={{position:"relative", left:90}}>
          <a onClick={logout}><h3>logout</h3></a> 
          </Navbar.Text>
      

      </Navbar.Collapse>
      </Container>
    </Navbar>
{/* *****************************Post Form ******************************/}
<div className="card2">
      <h3 style={{fontWeight:"bold"}}> what is in your mind ?</h3>
        <Form.Control as="textarea" rows={10}  style={{ width:"490px",height:"60px"}} name='content' onChange={handelNewPost} />
        <Form.Control type='file'  style={{width:"490px",height:"40px"}} name='image' onChange={handelNewPost}/>
        <br/>

        <Button onClick={HandelClick} style={{width:"50px",height:"auto",position:"flex",left:0,bottom:0,margin:"5px"}}><IoIosSend />
 </Button>
   </div>
   

{/***************************************** **********************************/}


{/* ***************************** Following Posts Form ******************************/}
<div style={{position:"absolute",top:"50%",left:"30%"}} >
      {posts && posts.map((post,key)=>(
    
        <PostCard 
        key={key}
        author_username={post.author_username}
       content={post.content}
       comments_count={post.comments_count}
       likes_count={post.likes_count}
       date={post.date}
       add_like={AddLike}
      
       author={post.author}
       posts={posts}
       id={post.id}
       
       
       />
     

     
      
    
      ))}
      </div>
      {/* <button onClick={()=>{ console.log("comments :",comments)}}> Click </button>
      <button onClick={()=>{ console.log("posts :",posts)}}> post </button> */}
     
      
      <ul>
  
</ul>




        </div> 
        }
     

    </div>
  );
}

export default Home;
// http://127.0.0.1:8000/images/carrot.jpg

{/** test post card */}
      {/* <PostCard
author={"admin"}
content={"hello world "}
image={require("../images/picture.jpg")}
<button onClick={()=>{ console.log("comments :",comments);}}> Click </button>

      /> */}
       {/***************************************** **********************************/}

