import React from "react";
import { CiHeart } from "react-icons/ci";
import { GoComment } from "react-icons/go";
import { LuSend } from "react-icons/lu";
import { CiBookmark } from "react-icons/ci";
import { IoIosMore } from "react-icons/io";
import {picture} from '../images/picture.jpg';
import { Col, Row } from "react-bootstrap";
import Home from "./HomePage";
import { FaComment } from "react-icons/fa";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaRegComment } from "react-icons/fa6";
const imageUrl=``

const PostCard=(props)=>{
// const {image}=props
// console.log("image props : ",props.image);
    return(
      <div className="con">

{/*  `..`+props.image        //  image={require(post.image!==null ? `..`+post.image:"../images/picture.jpg" )}
  <img src={props.image} alt="image"/> */}
        <div className="card-container">
   
        <p className="card-description">{props.date}</p>
        <h3 className="card-title"> {props.author_username}</h3>
        <p className="card-description">{props.content}</p>
        <div style={{ margin:"15px",display:"flex",
  flexDirection: "row", 
  justifyContent: "flex",}}>
        <CiHeart size={"37px"}/> <h6>{props.likes_count}</h6>
        <FaRegComment size={"30px"}/><h6>{props.comments_count}</h6>
       
        {/* <CiBookmark size={"37px"}/> */}
            
        </div>

        <InputGroup className="mb-3" style={{padding:"10px",position:"relative"}}>
        <InputGroup.Text id="inputGroup-sizing-default">
          add
        </InputGroup.Text>
        <Form.Control
          aria-label="post"
          aria-describedby="inputGroup-sizing-default"
        />
        </InputGroup>
      {/**all comments must be displayed here */}
      <p>{props.comments}</p>
      
</div>
  </div>
    );
}
export default PostCard;

