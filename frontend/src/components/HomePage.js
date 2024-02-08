
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










function Home({children}) {
const navigate=useNavigate();
const [following,setFollowing]=useState([]);
const followingIds=[];


const {user,logout,authToken}=useContext(AuthContext);
 let Getposts=[];

const [posts,SetPosts]=useState([]);

//method to get the following fot user
const getFollowing = async()=>{
  if(authToken){
  console.log("TOKEN : ",authToken.access);
 try{
  let response= await fetch(`${BASE_URL}profile/following/`,{
    method:"GET",
    headers:{
     
      "Content-Type":"application/json",
      "Authorization":`Bearer ${authToken.access}`,
    
    }
  })
  let data= await response.json()
    setFollowing(data)
    }catch(error){
  console.log(error);
     }
      }
      else{
  navigate("/login")
      }}



useEffect(()=>{
  getFollowing()

},[])



const getPost= async (id)=>{
      let response= await fetch(`${BASE_URL}post/${id}/get_post_author/`,{
        method:"GET",
        headers:{
        "Authorization":`Bearer ${authToken.access}`,
        "Content-Type":"application/json"
      },
   
      })
      let data= await response.json()
   
 
    console.log("Fetched Posts for user : ",id," Data : ", data.content);
   SetPosts(prev=>[...prev,...data])
    
  
      
    }


const getAllPosts= async ()=>{
  following.map(item=>(
    followingIds.push(item.following)
   ))
 
  for( let i=0;i<=followingIds.length;i++){
    const Ids = followingIds[i]
    try{
      await getPost(Ids)
    }
    catch{
    
    }
  
}}
    

  useEffect(()=>{

    getAllPosts()
   
  
},[following])






  return (
    <>    
   {user &&
      <div className="App">
     <header className="App-header">
      <br/>
          <h1 style={{}}> Welcome to HOME PAGE  </h1>
      <br/>
    
  
       <Button variant="primary" onClick={logout} size="lg"> Logout </Button>
       <br/>
       <Button variant="primary" onClick={()=> {navigate("/profile")}} size='lg'> profile </Button>
       <br/>
       <Button variant="primary" onClick={()=> {navigate("/rooms")}} size='lg'> Chat Rooms </Button>
       

      
       {/* Display All Posts */}
<ul>
  {/* { posts && posts.map(post=>(
    <li>{post.content}</li>
  ))} */}
</ul>
       </header>
      
</div>

      }
      {user? (<div className="App"> 
      <header className="App-header">
     
      </header>
      </div>
      ):(
        <div>
      <h1 > Welcome To Blogz App Please log in</h1> <Link to={"/login"}> Login </Link>
      </div>)}
      
  </>
   

  );
}

export default Home;