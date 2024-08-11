import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import './Navbar.css';
import logo from '../Navbar/logo.png';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(prev => !prev);
  };

  const handleLogout = () => {
    logout();
    setDropdownVisible(false);
  };

  return (
    <nav className="navbar">
      <img src={logo} alt="logo" className="logo" />
      <ul className="navbar-menu">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="#news">News</a></li>
        <li><a href="#credits">Credits</a></li>
      </ul>

      <div className="auth-section">
        {isAuthenticated ? (
          <div className="dropdown">
            <FaUserCircle className="profile-icon" onClick={toggleDropdown} />
            {dropdownVisible && (
              <div className="dropdown-menu">
                <button onClick={handleLogout}>Log out</button>
              </div>
            )}
          </div>
        ) : (
          <div className="signup">
            <Link to="/auth">
              <button>Login/Sign up</button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
