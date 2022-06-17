import React, { useEffect } from "react";

const Logout = () => {
    useEffect(()=>{
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        // alert("logged out successfully...")
        window.location.href = "/";
    },[])
    return (
        <div style={
            {
                "width":"100%",
                "height":"100%",
                "display":"flex",
                "justifyContent":"center",
                "alignItems":"center"

            }
        }>
            <h1 style={{"fontSize":"100px"}}>Logout</h1>
        </div>
        
    ) ;
  };
  
  export default Logout;