import React, { useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext=createContext("");

export default AuthContext;

export const BASE_URL="http://127.0.0.1:8000/";



export const AuthProvider=({ children })=>{

   // check if authToken is in Local storge and set it as initial value
   //  make it more efficient by using a callback function,this means this value will only be set once on the inital load and it won't call it every single time
const [authToken,setAuthToken]=useState( ()=>localStorage.getItem("authToken")? JSON.parse(localStorage.getItem("authToken")):null);  
const [user, setUser]=useState(()=>localStorage.getItem("authToken")? jwtDecode(localStorage.getItem("authToken")):null);
const navigate=useNavigate();
const [loading,setLoading]=useState(true);

    
const login= async (e)=>{
e.preventDefault();
let response=  await fetch(`${BASE_URL}token/`,{
    method:"POST", 
        headers:{
            "Content-Type":"application/json"

        },
        body:JSON.stringify({"email":e.target.email.value,"password":e.target.password.value})
    })
 
    let data =await response.json();
   
    if(response.status===200){
        console.log("DATA ACCESS : ",data.access);
        console.log("DATA REFRESH : ",data.refresh);
        
        setAuthToken(data);
      
       setUser(jwtDecode(data.access))
       localStorage.setItem("authToken",JSON.stringify(data))
        navigate("/")
    
    }
    else{
        alert("We couldn't find an account associated with the provided credentials");
    }
  
};
let logout=()=>{
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("authToken")
    navigate("/login")
}


let updateToken= async ()=>{
    let response= await fetch(`${BASE_URL}token/refresh/`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({"refresh":authToken?.refresh})
    })
    let data =await response.json();
    if(response.status===200){
        setAuthToken(data);
       setUser(jwtDecode(data.access))
       localStorage.setItem("authToken",JSON.stringify(data))
    }
    else{
       logout();
    }
    if(loading){
        setLoading(false)
    }
}


// we use clearInterval to ensures that any interval set by a previous invocation of this effect is cleared
// when the component unmounts or when the dependencies (authTokens and loading) change.

 useEffect(()=>{
    if(loading){
                updateToken()
    }
    let fourMinutes=1000*40*60
        const interval=setInterval(()=>{
            if(authToken){
            
                updateToken()
                console.log("Token Updated");
               
            }
           
           
        },fourMinutes)
        return ()=>clearInterval(interval);

},[authToken,loading])

const context={
    user:user,
    login:login,
    logout:logout,
    authToken:authToken,
};
return(
        <AuthContext.Provider value={context}>{ loading? null :children}</AuthContext.Provider>
    );
};

