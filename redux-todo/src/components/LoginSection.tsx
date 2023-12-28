import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../actions/AuthActions';

interface LoginSectionProps {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    toggleSection: () => void;
  }

const LoginSection: React.FC<LoginSectionProps> = ({ onSubmit, toggleSection }) => {
  const dispatch = useDispatch();

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add your logic to handle registration
    // Dispatch other relevant actions if needed
    dispatch(login());
    console.log('Pretending to login (add API calls verify account)');
  };

  return (
    <div className="w-full max-w-md mx-auto">
    <form onSubmit={handleLogin} className="bg-white shadow-md rounded-lg px-10 pt-8 pb-10">
      <div className="mb-6">
        <label className="block text-gray-700 text-lg font-bold mb-4">
          Username:
          <input
            className="shadow appearance-none border rounded w-full py-3 px-4 text-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="username"
            placeholder="Username"
          />
        </label>
        <label className="block text-gray-700 text-lg font-bold mb-4">
          Password:
          <input
            className="shadow appearance-none border rounded w-full py-3 px-4 text-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            name="password"
            placeholder="Password"
          />
        </label>
      </div>
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline"
      >
        Login
      </button>
      <button
        onClick={toggleSection}
        className="block mt-6 text-lg text-blue-500 hover:text-blue-700 focus:outline-none"
      >
        Don't have an account? Register
      </button>
    </form>
  </div>
  );
};

export default LoginSection;
