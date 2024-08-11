import React from 'react';
import './Feed.css';
import ewpic from '../Feed/ewpic.jpg'
import bwpic from '../Feed/bw.jpg'
import cpic from '../Feed/ecollection.jpg'

const Feed = () => {
  return (
    <div className="feed">
    
      <h1 className="main-heading">Transforming Ideas into Sustainable Actions</h1>
      <div className="feed-content">
        <div className="feed-item">
          <img src= {ewpic} alt="E-waste" className="feed-image" />
          <h2>e-waste</h2>
          <p>
          Through advanced strategies and tech-driven solutions,
           we’re transforming the future of e-waste management.
          </p>
        </div>
      
        <div className="feed-item">
          <img src={bwpic} alt="Battery waste" className="feed-image" />
          <h2>battery waste</h2>
          <p>
          We support industry leaders in interpreting circularity and developing sustainable battery waste ecosystems
          </p>
        </div>
        <div className="feed-item">
          <img src={cpic} alt="Collect waste" className="feed-image" />
          <h2>Collect waste</h2>
          <p>
          Helping you take the first step in e-waste recycling by collecting and directing it to the right centers
          </p>
        </div>
        
        
      </div>
    </div>
  );
};

export default Feed;
