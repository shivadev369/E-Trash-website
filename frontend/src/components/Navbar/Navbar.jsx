import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src='./assets/react.svg' alt='logo' className='logo'/>
      <ul className="navbar-menu">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="#news">News</a></li>
      
      </ul>
      <div className='search-box'>
        <input type="text" placeholder="Search" />
      </div>
      <div className='signup'>
        <Link to="/auth">
          <button>Login/Sign up</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
