import React, { useState } from 'react';
import Register from './Register';
import Login from './Login';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = () => {
    // Update your authentication state here
  };

  return (
    <div className='auth-container'>
      {isLogin ? (
        <Login onLogin={handleLogin} setIsLogin={setIsLogin} />
      ) : (
        <Register setIsLogin={setIsLogin} />
      )}
    </div>
  );
};

export default Auth;
