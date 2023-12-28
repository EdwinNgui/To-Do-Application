import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../actions/AuthActions';

const RegisterSection: React.FC = () => {
  const dispatch = useDispatch();

  const handleLoginClick = () => {
    // Dispatch the login action when the login button is clicked
    dispatch(login());
    console.log('Redirecting to login...');
    // Add your logic to navigate to the login page
  };

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add your logic to handle registration
    // Dispatch other relevant actions if needed
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <button type="submit">Register</button>
      </form>

      <button className="alternative-login-btn" onClick={handleLoginClick}>
        Already have an account? Login
      </button>
    </div>
  );
};

export default RegisterSection;
