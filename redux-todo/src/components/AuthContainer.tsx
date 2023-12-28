import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../actions/AuthActions';
import LoginSection from './LoginSection'; // Import your LoginSection component
import RegisterSection from './RegisterSection'; // Import your RegisterSection component

const AuthContainer: React.FC = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false); // State to toggle between login and register sections

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle registration logic
    console.log('Registering...');
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle login logic
    dispatch(login());
    console.log('Logging in...');
  };

  const toggleAuthSection = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin); // Toggle between login and register sections
  };

  return (
    <div className="auth-container">
      {isLogin ? (
        <LoginSection onSubmit={handleLogin} toggleSection={toggleAuthSection} />
      ) : (
        <RegisterSection onSubmit={handleRegister} toggleSection={toggleAuthSection} />
      )}
    </div>
  );
};

export default AuthContainer;
