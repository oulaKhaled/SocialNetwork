
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useEffect, useState } from 'react';
import { Button } from 'bootstrap';
// import { AuthProvider } from './components/LoginPage';
import AuthContext from '../context/AuthContext';
import { AuthProvider } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Login from './LoginPage';

import { BASE_URL } from '../context/AuthContext';

import Nav from 'react-bootstrap/Nav';

import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
function Home({children}) {
const navigate=useNavigate();
const [following,setFollowing]=useState([]);
const followingIds=[];


const {user,logout,authToken}=useContext(AuthContext);
let posts=[];

const [posts2,SetPosts]=useState();

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
}

}


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


      console.log("Fetched Posts for user : ",id," Data : ", data);
      console.log("Content of Posts :",);
      posts.push(data[0].content)
    }


const getAllPosts= async ()=>{
  const id=Object.values(following)

  following.map(f=>(
    followingIds.push(f.following)
   ))
 
  for( let i=0;i<=followingIds.length;i++){
    const Ids = followingIds[i]
    try{
      await getPost(Ids)
    }
    catch{
    
    }
  } }
    


useEffect(()=>{
  console.log("following :",following);
 
  
  
  getAllPosts();
 
  console.log("Posts :",posts);
  SetPosts(posts)
  console.log(" POSTS 2 :",posts2);
  console.log("Type POst :", typeof posts); 
  console.log("Type POst2 :", typeof posts2); 

  // console.log("Type of Posts : ", typeof posts);

},[following]);

  return (
    <>    
   {user &&
    <div style={{fontSize:"28px",backgroundColor:'grey', fontFamily:'Oswald'}}>
        <Nav variant="tabs" defaultActiveKey="/home">
       <Nav.Item>
        <Nav.Link href="/home"> <p>Active</p></Nav.Link>
       </Nav.Item>
       <Nav.Item>
        <Nav.Link href="/profile"> <p>Profile</p></Nav.Link>
       </Nav.Item>
      
       <Nav.Item>
       <h2  style={{margin:"10px"}} onClick={logout}> Logout </h2>
       </Nav.Item>
      </Nav>
      
      <div className="App">
     <header className="App-header">
      <br/>
      
          <h1 style={{}}> Welcome to HOME PAGE  </h1>
          {/* <button onClick={getFollowing}> Click To get Following </button>
          <button onClick={getAllPosts}> Click To get Posts  </button> */}
          
      <br/>
       <h1>{user.username}</h1>


       {/* Display All Posts */}
{/* <ul>
  { posts2 && posts2.map(post=>(
    <li>{post.content}</li>
  ))}
</ul> */}


       </header>
</div>
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