import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const slideImages = [
  {
    url: process.env.PUBLIC_URL+"pic1.jpg",
    caption: 'Slide 1'
  },
  {
    url: process.env.PUBLIC_URL+"pic2.jpg",
    caption: 'Slide 2'
  },
  {
    url: process.env.PUBLIC_URL+"pic3.jpg",
    caption: 'Slide 3'
  },
];

const ImageSlider = () => {
    return (
      <div className="slide-container">
        <Slide>
         {slideImages.map((slideImage, index)=> (
            <div className="each-slide" key={index}>
              <div className="Home-Text" style={{'backgroundImage': `url(${slideImage.url})`}}>
               Search Messes<br/> Nearby
              </div>
            </div>
          ))} 
        </Slide>
      </div>
    )
}

export default ImageSlider;