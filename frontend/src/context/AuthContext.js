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
  const [loading,setLoading]=useState(false);

    
const login= async (e)=>{
e.preventDefault();
    let response= await fetch(`${BASE_URL}token/`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({"email":e.target.email.value,"password":e.target.password.value})
    })
 
    let data =await response.json();
   
    if(response.status===200){
        setAuthToken(data);
       setUser(jwtDecode(data.access))
       localStorage.setItem("authToken",JSON.stringify(data))
        navigate("/")
    
    }
    else{
        alert("Something goes wrong");
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
        body:JSON.stringify({"refresh":authToken.refresh})
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
    
}


// we use clearInterval to ensures that any interval set by a previous invocation of this effect is cleared
// when the component unmounts or when the dependencies (authTokens and loading) change.

 useEffect(()=>{
    let fourMinutes=1000*4*60
        const interval=setInterval(()=>{
            if(authToken){
                console.log("Token Updated");
                updateToken()
               
            }
           
        },fourMinutes)
        return ()=>clearInterval(interval);

},[authToken,loading])

const context={
    user:user,
    login:login,
    logout:logout
};
return(
        <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
    );
};

