import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from '../actions/AuthActions';
import { RootState } from "../types/todoTypes"; // Replace with your RootState and Todo types
import { AuthState } from "../types/authTypes";
import { useAppSelector, useAppDispatch } from "../hooks/thunk";

const RegisterSection: React.FC = () => {
  const dispatch = useDispatch();
  const authState: AuthState = useAppSelector((state: RootState) => state.auth); // Access 'auth' state

  //If user chooses to login instead
  const handleLoginClick = () => {
    dispatch(logout());
    console.log('Redirecting to login...');
  };

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add your logic to handle registration
    // Dispatch other relevant actions if needed
    dispatch(login());
    console.log('Pretending to create account in (add API calls to create account)');
  };

// Ensure RegisterSection re-renders when authState changes
useEffect(() => {
    console.log('Auth State changed:', authState);
    }, [authState]);

  return (
    <div className="register-container">
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
        Already have an account? Login (currently dispatches logout for testing)
      </button>
    </div>
  );
};

export default RegisterSection;
