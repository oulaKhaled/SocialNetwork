import React, { useEffect,useState }  from "react";
import { Nav,Navbar,Container } from "react-bootstrap";
import { IoChatboxOutline } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { BASE_URL } from "../context/AuthContext";
function Header(){
    const { user, logout, authToken } = useContext(AuthContext);
    const navigate=useNavigate();
const [friendsRequest,setFriendRequest]=useState([]);

    const getfriendRequest= async()=>{
        let response= await fetch(`${BASE_URL}profile/friendRequest/?reciver_id=${user.user_id}`,{
          method:"GET",
          headers: { "Content-Type":"application/json",
          "Authorization":`Bearer ${authToken.access}`}
        },

      )
      let data = await response.json();
      console.log("Friend Requests : ",data);
      
        setFriendRequest(prev=>[...prev,...data])
     
      
        
    }
useEffect(()=>{
  getfriendRequest();
},[]);


// useEffect(()=>{
  

// },[getfriendRequest])


const test=(e)=>{
  console.log("getFriend request array ",friendsRequest);

}

return(   
         <>

<div className="bg--bodytertiary"  >
    <Container style={{ backgroundColor:"#151515"}}>
    <div style={{display:"flex",
  flexDirection: "row",}}>
    <h1 style={{color:"#ffff",margin:"20px"}} onClick={()=>{navigate("/")}} >BLOGZ</h1>
    <h3 style={{color:"#ffff",margin:"25px"}} onClick={()=>{navigate('/profile',{state:{props2:user.user_id}})}} >profile</h3>
    <Dropdown style={{position:"flex",left:"900px",margin:"20px"}}>
        <Dropdown.Toggle >
        <button  size={"33px"}  style={{position:"relative",color:"#ffff"}} onClick={test}/>
      
      <Dropdown.Menu>
      
      {friendsRequest && friendsRequest.map(ele=>(
        <p>{ele.sender} send a request to you </p>
      ))}

      
      </Dropdown.Menu>
        </Dropdown.Toggle>
        <button style={{margin:"20px"}} onClick={logout}> logout</button>
      </Dropdown>
    
      
</div>
        
      </Container>
    </div>
    </>)







}
export default Header;

// onClick={()=>{navigate('profile',{state:{props2:user.user_id}})}} onClick={()=>{navigate("/")}} onClick={()=>{navigate("/rooms")}} onClick={logout} 