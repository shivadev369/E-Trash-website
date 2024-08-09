import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaEnvelope } from "react-icons/fa";
import './Auth.css';

const Login = ({ onLogin, setIsLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error message when user changes input
    if (loginError) {
      setLoginError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/login', formData);

      if (response.status === 200) {
        alert('Login successful');
        onLogin(); // Call onLogin to update authentication status
        navigate('/'); // Redirect to home page
      } else {
        setLoginError('Login failed. Invalid email or password');
      }
    } catch (error) {
      setLoginError('Login failed. Please try again.');
    }
  };

  return (
    <div className='wrapper'>
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
          <p>Don't have an account? <a href="#!" onClick={() => setIsLogin(false)}>Register</a></p>
        </div>
      </form>
    </div>
  );
};

export default Login;
