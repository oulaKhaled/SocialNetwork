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
           <div style={{fontSize:"28px",backgroundColor:'grey', fontFamily:'Oswald'}}>
<Nav variant="tabs" defaultActiveKey="/profile">
       <Nav.Item>
        <Nav.Link href="/"> <p>Active</p></Nav.Link>
       </Nav.Item>
       <Nav.Item>
        <Nav.Link href="/profile"><p>Profile</p></Nav.Link>
       </Nav.Item>
     
       <Nav.Item>
       <h2  style={{margin:"10px"}} onClick={logout}><p> Logout</p> </h2>
       </Nav.Item>
      </Nav>
      </div>
        <div className="App">
            <header className="App-Header">
            <h1> Profile Page  </h1>
           <div className="container">
            {/* <Col xs={7} md={8}  >
                 <Image className="profile" src={require('')}  roundedCircle />
               </Col> */}
               </div>
            </header>
        </div>
</div>
  
        )};

export default Profile;