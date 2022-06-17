// import { Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { Button } from 'react-bootstrap';
import React from "react";
import "../index.css";


const Features =()=>{
    return(
        <>
            <div className="Features-body">
                <div style={{"display":"inline-block","width":"50%"}}>
                    <h1>What is <br/>Mess Locator</h1>
                    <hr/><br/>
                    <p>Mess Locator is web based platform designed help students for finding messes around them.
                        This platform provides messes around and also helps you to explore them easily.
                        Mess owners are also benefited as it provides direct connection with the students.
                    </p>
                    <Button variant="primary" href="/Explore">Explore<SendIcon style={{"marginLeft":"5px"}}/></Button>
                </div>
                <div style={{"display":"flex","justifyContent":"center","width":"50%"}}>
                    <img src={process.env.PUBLIC_URL+"beet.png"} height="70%" width="70%" />
                </div>
                
            </div>
        </>
    )



}

export default Features;