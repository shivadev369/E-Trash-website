import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../Navbar/logo.png'

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={logo} alt='logo' className='logo'/>
      <ul className="navbar-menu">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="#news">News</a></li>
        <li><a href="#credits">Credits</a></li>

      
      </ul>
      
      <div className='signup'>
        <Link to="/auth">
          <button>Login/Sign up</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
