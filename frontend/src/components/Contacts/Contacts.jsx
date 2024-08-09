import React from 'react';
import './Contacts.css';

const Contacts = () => {
  return (
    <div className="contact-container">
      <div className="contact-header">
        <img src="path_to_logo" alt="Logo" className="logo" />
        <h2>Join us in making recycling a way of life.</h2>
      </div>
      <div className="contact-content">
        <div className="contact-details">
          <p>For other queries:</p>
          <a href="mailto:etrash@gmail.com">etrash@gmail.com</a>
          <p>0124-4551067 (landline)</p>
        
          <p>Find us at:</p>

        </div>
        <div className="links">
          <div className="take-action">
            <h3>Take action</h3>
            <ul>
              <li><a href="#">All Services</a></li>
              <li><a href="#">Collection Centres</a></li>
              <li><a href="#">Schedule a pick-up</a></li>
            </ul>
          </div>
          <div className="other-links">
            <h3>Other Links</h3>
            <ul>
              <li><a href="#">About us</a></li>
              <li><a href="#">Resources</a></li>
              <li><a href="#">Services Providers</a></li>
            </ul>
          </div>
          <div className="connect">
            <h3>Connect</h3>
            <ul>
              <li><a href="#">Instagram</a></li>
              
              <li><a href="#">Facebook</a></li>

              <li><a href="#">Email</a></li>
            </ul>
          </div>
        </div>
      </div>
      <footer>
        <p>&copy; 2024 | ALL RIGHTS RESERVED</p>
        <div className="footer-links">
          <a href="#">Terms and conditions</a>
          <a href="#">Privacy policy</a>
          <a href="#">Cookies</a>
        </div>
      </footer>
    </div>
  );
};

export default Contacts;
