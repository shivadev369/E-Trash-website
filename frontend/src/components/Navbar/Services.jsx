import React from 'react';

const Services = () => {
  return (
    <li className="dropdown">
      <a href="#services">Services</a>
      <ul className="dropdown-menu">
        <li><a href="#services1">Sub Service 1</a></li>
        <li><a href="#services2">Sub Service 2</a></li>
        <li><a href="#services3">Sub Service 3</a></li>
      </ul>
    </li>
  );
};

export default Services;
