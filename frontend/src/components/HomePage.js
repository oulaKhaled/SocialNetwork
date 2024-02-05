
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useEffect, useState } from 'react';
import { Button } from 'bootstrap';
// import { AuthProvider } from './components/LoginPage';
import AuthContext from '../context/AuthContext';
import { AuthProvider } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Login from './LoginPage';

import { BASE_URL } from '../context/AuthContext';


import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
function Home({children}) {
const navigate=useNavigate();
const [following,setFollowing]=useState([]);

const {user,logout,authToken}=useContext(AuthContext);
//const[posts,SetPost]=useState([]);
let posts=[];

//method to get the following fot user
const getFollowing = async()=>{
  console.log("TOKEN : ",authToken.access);
  let response= await fetch(`${BASE_URL}profile/following/`,{
    method:"GET",
    headers:{
     
      "Content-Type":"application/json",
      "Authorization":`Bearer ${authToken.access}`,
    
    }
  })
    if(response.status===200){
  let data= await response.json()

setFollowing(data)
 }
 else{
  console.log('Failed to fetch data:', response.statusText);
 }
}




//get all posts that is related to the followings


// method to get all id's for the following users to fetch their posts
// const getPosts2=()=>{
//   const  values=Object.values(following)
//   values.map(value=>(
//    posts.push(value[Object.keys(value)[0]])
//   ))
//   console.log(posts);
//  const arraLength=posts.length
//  const i=0;
//  while(i<arraLength){
  
//   const getPost= async ()=>{
//     let response= await fetch(`${BASE_URL}post/${posts[i]}`,{
//       method:"GET",
//       headers:{
//       "Authorization":`Bearer ${authToken.access}`,
//       "Content-Type":"application/json"
//     },
//     })
//     let data= await response.json()
//     console.log(data);
//     i++;
  
//   }
//  }
//  }
useEffect(()=>{

  getFollowing()
  

  
},[])



useEffect(()=>{
  console.log("following :",following);
  // getPosts2()
  const id=Object.values(following)
},[following])



  return (
    <>    
    <div className="App">
      <header className="App-header">
      {user && <h1 style={{}}> HOME PAGE   {user.username} </h1>} 
      {user? (<div> 
      <p onClick={logout}> Logout </p>
      </div>
      ):(
        <div>
      <h1 > Welcome To Blogz App Please log in</h1> <Link to={"/login"}> Login </Link>
      </div>)}
      
      </header>
     
    </div>

    </>

  );
}

export default Home;