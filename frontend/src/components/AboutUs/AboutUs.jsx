import React from 'react';
import './AboutUs.css';
import assure from '../AboutUs/assure.png'
import hand from '../AboutUs/hand.png'
import justice from '../AboutUs/justice.png'
const AboutUs = () => {
  return (
    <div className="about-us">
      <div className="about-us-container">
        <h1>About Us</h1>
        <h2>Our Mission</h2>
        <h3>Transform E-Waste Recycling into a Daily Habit for a Billion People</h3>
        <p>E-Trash is committed to making e-waste recycling an integral part of everyday life.</p>
        <p>As we face unprecedented environmental challenges, the need for real, collective action has never been greater. This is our moment to make a difference, and it requires a united effort from all sectors of society.</p>
        <p>E-Trash is a unified platform for businesses, consumers, governments, and organizations to collaborate and foster a circular economy. We provide a seamless service for disposing of e-waste, ensuring that it is responsibly recycled at certified centers.</p>
        <p>Join us in this vital mission to make e-waste recycling a reality for everyone, every day. Together, we can create sustainable change and protect our planet for future generations.</p>
      </div>
      <br />
      <br />
      <h3>Our principles</h3>
      <div className="values-container">
        <div className="value-item">
          <img src={assure} alt="Transparency" />
          <p>Trust</p>
        </div>
        <div className="value-item">
          <img src={hand} alt="Assurance" />
          <p>Cooperation</p>
        </div>
        <div className="value-item">
          <img src={justice} alt="Fairness" />
          <p>Fairness</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
