import React from 'react';
import './Feed.css';
import ewpic from '../Feed/ewpic.jpg'
import bwpic from '../Feed/bw.jpg'

const Feed = () => {
  return (
    <div className="feed">
    
      <h1 className="main-heading">we create circular economy solutions for thought leaders</h1>
      <div className="feed-content">
        <div className="feed-item">
          <img src= {ewpic} alt="E-waste" className="feed-image" />
          <h2>e-waste</h2>
          <p>
            through pioneering practices and technological innovation,
            our programmes help shape contours of the e-waste industry
          </p>
        </div>
      
        <div className="feed-item">
          <img src={bwpic} alt="Battery waste" className="feed-image" />
          <h2>battery waste</h2>
          <p>
            we are helping industry leaders decode circularity and create collection and
            recycling ecosystems for battery waste
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default Feed;
