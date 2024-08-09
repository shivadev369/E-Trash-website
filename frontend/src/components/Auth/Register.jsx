import React, { useState } from 'react';
import axios from 'axios';
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import './Auth.css';

const Register = ({ setIsLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const [registrationError, setRegistrationError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error messages when user changes input
    if (registrationError) {
      setRegistrationError('');
    }

    if (passwordMatchError && name !== 'confirmPassword') {
      setPasswordMatchError('');
    }

    if (name === 'confirmPassword') {
      if (formData.password !== value) {
        setPasswordMatchError('Passwords do not match.');
      } else {
        setPasswordMatchError('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatchError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        alert('You have registered successfully');
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        setPasswordMatchError('');
        setRegistrationError(''); // Clear registration error
        setIsLogin(true); // Switch to login form
      } else {
        setRegistrationError('Registration failed. Please try again.');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response.data.code === 11000) { // Check for duplicate key error
          setRegistrationError('Email already exists.');
        } else {
          setRegistrationError(error.response.data.message || 'Registration failed. Please try again.');
        }
      } else {
        setRegistrationError('Registration failed. Please try again.');
      }
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div className="input-box">
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <FaUser className='icon' />
        </div>
        <div className="input-box">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
            value={formData.email}
          />
          <FaEnvelope className='icon' />
        </div>
        <div className="input-box">
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
            value={formData.password}
          />
          <FaLock className='icon' />
        </div>
        <div className="input-box">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            onChange={handleChange}
            value={formData.confirmPassword}
          />
          <FaLock className='icon' />
          {passwordMatchError && <span className="error">{passwordMatchError}</span>}
        </div>
        {registrationError && <span className="error">{registrationError}</span>}
        <button type="submit">Register</button>
        <div className="toggle-link">
          <p>Already have an account? <a href="#!" onClick={() => setIsLogin(true)}>Login</a></p>
        </div>
      </form>
    </div>
  );
};

export default Register;
