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

function Home({ children }) {
  const navigate = useNavigate();
  const [following, setFollowing] = useState([]);
  const followingIds = [];
  const [newpost,setNewPost]=useState({
    "content":"",
    "image":""
  })


  const { user, logout, authToken } = useContext(AuthContext);
  let Getposts = [];

  const [posts, SetPosts] = useState([]);

  //method to get the following fot user
  const getFollowing = async () => {
    if (authToken) {
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
        setFollowing(data)
      } catch (error) {
        console.log(error);
      }
    }
    else {
      navigate("/login")
    }
  }
  useEffect(() => {
    getFollowing()

  }, [])



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
    SetPosts(prev => [...prev, ...data])



  }


  const getAllPosts = async () => {
    following.map(item => (
      followingIds.push(item.following)
    ))

    for (let i = 0; i <= followingIds.length; i++) {
      const Ids = followingIds[i]
      try {
        await getPost(Ids)
      }
      catch {

      }

    }
  }


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
const deletePost= async()=>{

}
const updatePost=async()=>{

}
const AddComment= async()=>{

}
const AddLike=async()=>{

}

const SendFriendRequest= async()=>{

}
const acceptFriend= async()=>{

}



  useEffect(() => {
    getAllPosts()
  }, [following])

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


  return (
    <>
      {user &&
     <div>

     <FontAwesomeIcon icon="fa-solid fa-heart" />
    
     <h1 style={{position:"relative",
    textAlign: "center",
    top: "40%",
    width: "100%",}}> Welcome to HOME PAGE  </h1>
     <Stack style={{width:"100px" ,margin:"10px"}}>   
         <Button variant="primary"  className='HomeButtons' onClick={logout} size="lg"> Logout </Button>
        <br />
           <Button variant="primary" className='HomeButtons' onClick={() => { navigate("/profile") }} size='lg'> profile </Button>
           <br />
           </Stack>
        
           <Button variant="primary" style={{position: 'absolute',
    top:0,
    right:0,
    margin:"30px",
}} onClick={() => { navigate("/rooms") }} size='lg'> <FontAwesomeIcon icon={faMessage} size="2x"  /> </Button>


{/* *****************************Post Form ******************************/}
<div style={{left:"28%",position:"relative",bottom:"100px",marginTop:"30px",paddingLeft:"50px",paddingTop:"20px",hight:"100px",width:"40%"}}>
        <Form.Label>Add new Post</Form.Label>
        <Form.Control as="textarea" rows={10}  style={{ width:"500px",height:"60px",}} name='content' onChange={handelNewPost} />
        <Form.Control type='file'  style={{width:"500px",height:"40px"}} name='image' onChange={handelNewPost}/>
        <FontAwesomeIcon icon={faFile} />
        <br/>
        <Button onClick={HandelClick}>Add new post </Button>
   </div>

{/***************************************** **********************************/}

        <div className="App">
          <header className="App-header">
          { posts && posts.map(post=>(
            <Row xs={1} md={2} className="g-4">
          <Col>
          <Card 
          border='primary'
          style={{ width: '40rem',display:"flex" ,margin:"30px",}}> 
           <Card.Body style={{ position: "relative" }}>
           {/* <Card.Img  variant="top" src={`http://127.0.0.1:8000/media/${post.image}`} /> */}
            <Card.Title style={{position:"absolute", left: 0, marginLeft: "10px", marginTop:"0px",fontWeight:"bold"}}>{post.author_username} </Card.Title>
            <Card.Title> <h6 style={{position:"absolute", right: 0, marginRight:"10px" }}>{post.date}</h6></Card.Title>
            <Card.Text style={{marginTop:"40px"}}>
              {post.content}
              {post.image &&
                <img  src ={`../app/media${post.image}`}/> 
              }
            </Card.Text>
          </Card.Body>
        
          <div style={{ left: 0,bottom:0}}>
          <Card.Header  > <FontAwesomeIcon icon={faComment}/> {post.comments_count}  <br/>
          <FontAwesomeIcon icon={faHeart} /> {post.likes_count} 
</Card.Header>
</div>
 </Card>
 </Col>
 </Row>
      
          ))} 
  
  <img alt='./app/media/images/carrot.jpg'/>
          </header>
        </div>
       
        
        </div>  }
     

    </>
  );
}

export default Home;
// http://127.0.0.1:8000/images/carrot.jpg