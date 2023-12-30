import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../actions/AuthActions';

interface RegisterSectionProps {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    toggleSection: () => void;
  }

const RegisterSection: React.FC<RegisterSectionProps> = ({ onSubmit, toggleSection }) => {
  const dispatch = useDispatch();

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(login());
    console.log('Pretending to create account in (add API calls to create account)');
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
          />
        </label>
        <label className="block text-gray-700 text-lg font-bold mb-4">
          Password:
          <input
            className="shadow appearance-none border rounded w-full py-3 px-4 text-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="current-password"
            name="current-password"
            placeholder="Password"
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
