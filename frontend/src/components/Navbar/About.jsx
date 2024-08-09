import React from 'react';

const About = () => {
  return (
    <li className="dropdown">
      <a href="#about">About</a>
      <ul className="dropdown-menu">
        <li><a href="#about1">Our Team</a></li>
        <li><a href="#about2">E-waste Recyclers</a></li>
      </ul>
    </li>
  );
};

export default About;
