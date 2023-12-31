import React, { useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../actions/AuthActions';
import useLoginVerification from './reactQuery/useLoginVerification'; // Import the login verification hook

interface LoginSectionProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  toggleSection: () => void;
}

const LoginSection: React.FC<LoginSectionProps> = ({ onSubmit, toggleSection }) => {
  const dispatch = useDispatch();
  const verifyLogin = useLoginVerification(); // Use the hook for login verification
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // Attempts to log in
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const loginResult = await verifyLogin.mutateAsync({ username, password });

      // Check if login verification was successful and the account is verified
      if (loginResult && loginResult.verified) {
        // If verified, dispatch the login action
        dispatch(login());
        // Handle successful login, maybe navigate to a different page
      } else {
        // Handle unverified account or other login failure
        console.error('Failed to verify user login');
      }
    } catch (error) {
      // Handle login failure
      console.error('Failed to log in:', (error as Error).message);
    }
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
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
        <button
          type="button"
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
