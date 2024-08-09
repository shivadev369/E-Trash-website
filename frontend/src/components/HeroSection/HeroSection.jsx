import React from 'react';
import './HeroSection.css'; // Import the CSS file for styling

const HeroSection = () => {
  return (
    <header className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
      <h1>E-Trash - Lets clean our environment </h1>
      <p>All it takes is just one step</p>
      </div>
    </header>
  );
};

export default HeroSection;
