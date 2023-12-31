import React, { useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../actions/AuthActions';
import useRegisterUser from "./reactQuery/useRegister";

interface RegisterSectionProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  toggleSection: () => void;
}

const RegisterSection: React.FC<RegisterSectionProps> = ({ onSubmit, toggleSection }) => {
  const dispatch = useDispatch();
  const registerUser = useRegisterUser();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  //Attempts to register
  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    try {
      const newUser = { username, password };
      const registrationResult = await registerUser.mutateAsync(newUser);
  
      // Check if the registration was successful and the account is verified
      if (registrationResult && registrationResult.verified) {
        // If verified, dispatch the login action
        dispatch(login());
        // Handle successful registration, maybe navigate to a different page
      } else {
        // Handle unverified account or other registration failure
        console.error('Failed to verify user account');
      }
    } catch (error) {
      // Handle registration failure
      console.error('Failed to register user:', (error as Error).message);
    }
  };
  

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleRegister} className="bg-white shadow-md rounded-lg px-10 pt-8 pb-10">
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-bold mb-4">
            Username:
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
            />
          </label>
          <label className="block text-gray-700 text-lg font-bold mb-4">
            Password:
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="current-password"
              name="current-password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline"
        >
          Register
        </button>
        <button
          type="button"
          onClick={toggleSection}
          className="block mt-6 text-lg text-blue-500 hover:text-blue-700 focus:outline-none"
        >
          Already have an account? Login
        </button>
      </form>
    </div>
  );
};

export default RegisterSection;
