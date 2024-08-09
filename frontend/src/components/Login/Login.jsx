import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [registrationError, setRegistrationError] = useState('');
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'confirmPassword') {
      setConfirmPasswordTouched(true);
    }

    if (confirmPasswordTouched || name === 'confirmPassword') {
      if (formData.password !== value) {
        setPasswordMatchError('Passwords do not match.');
      } else {
        setPasswordMatchError('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? 'http://localhost:3000/api/login' : 'http://localhost:3000/api/register';

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setPasswordMatchError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post(url, {
        name: isLogin ? undefined : formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        if (isLogin) {
          alert('Login successful');
          onLogin(); // Call onLogin to update authentication status
          navigate('/'); // Redirect to home page
        } else {
          alert('You have registered successfully');
          setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
          });
          setPasswordMatchError('');
          setConfirmPasswordTouched(false);
        }
      } else if (response.status === 401 && isLogin) {
        setLoginError('Login failed. Invalid email or password');
      }
    } catch (error) {
      if (isLogin) {
        setLoginError('Login failed. Please try again.');
      } else {
        setRegistrationError('Registration failed. Please try again.');
        console.error('Error:', error.response ? error.response.data : error.message);
      }
    }
  };

  return (
    <div className='wrapper'>
      {isLogin ? (
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
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
          {loginError && <span className="error">{loginError}</span>}
          <div className="remember-forgot">
            <label><input type="checkbox" />Remember me</label>
            <a href="/forgot-password">Forgot password?</a>
          </div>
          <button type="submit">Login</button>
          <div className="toggle-link">
            <p>Don't have an account? <a href="#!" onClick={toggleForm}>Register</a></p>
          </div>
        </form>
      ) : (
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
              onFocus={() => setConfirmPasswordTouched(true)}
            />
            <FaLock className='icon' />
            {passwordMatchError && <span className="error">{passwordMatchError}</span>}
          </div>
          {registrationError && <span className="error">{registrationError}</span>}
          <button type="submit">Register</button>
          <div className="toggle-link">
            <p>Already have an account? <a href="#!" onClick={toggleForm}>Login</a></p>
          </div>
        </form>
      )}
    </div>
  );
};

export default Auth;
