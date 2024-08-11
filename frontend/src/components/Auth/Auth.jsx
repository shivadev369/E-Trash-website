import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import Register from './Register';
import Login from './Login';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate(); // Initialize navigate function

  const handleClose = () => {
    navigate('/'); // Navigate to the Hero page
  };

  return (
    <div className='auth-container'>
      <button className="close-button" onClick={handleClose}>
        Close
      </button>
      {isLogin ? (
        <Login onLogin={() => {}} setIsLogin={setIsLogin} />
      ) : (
        <Register setIsLogin={setIsLogin} />
      )}
    </div>
  );
};

export default Auth;
