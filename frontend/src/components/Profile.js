import React  from "react";
import Nav from 'react-bootstrap/Nav';
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row'



const Profile=()=>{
const {user,authToken,logout}=useContext(AuthContext)
    return(

    
        <div>
          
        <div className="App">
            <header className="App-Header">
            <h1> Profile Page {user.username}  </h1>
           <div className="container">
           
               </div>
            </header>
        </div>
</div>
  
        )};

export default Profile;