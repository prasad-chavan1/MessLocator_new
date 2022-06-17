import React,{useEffect, useState} from "react";
import "../index.css"
import SlideImage from "./ImageSlider"
import Features  from './Features';
// import RoleBased from "./RoleBased";



const Home = () =>{
    const [show,setShow] = useState(true);
    return(
        <>
            <div className='HomeBody'>
                {/* <RoleBased show={show}
                onHide={() => setShow(false)}/> */}
                <SlideImage/>
                <Features/>
            </div>
        </>
    )
    
}

export default Home;