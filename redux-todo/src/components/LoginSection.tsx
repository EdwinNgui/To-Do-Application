import React, { useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../actions/AuthActions';
import useLoginVerification from './reactQuery/useLoginVerification'; // Import the login verification hook
import { useMutation } from 'react-query';
import axios from 'axios';

interface LoginSectionProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  toggleSection: () => void;
}

//Sends HTTP post request to the URL => Returns success/fail
const loginUserApi = async ({ email, password }: { email: string, password: string }) => {
  const response = await axios.post('http://[::1]/v1/users/login', {
    email,
    password,
  });

  if (!response.data) {
    throw new Error('Login failed');
  }

  return response.data;
};

//useMutation hook handles the HTTP request to API endpoint
const LoginSection: React.FC<LoginSectionProps> = ({ onSubmit, toggleSection }) => {
  const dispatch = useDispatch();
  const mutation = useMutation(loginUserApi, {
    onSuccess: (data: string) => {
      //If success: Logs it works
      console.log('Login successful', data);
      dispatch(login()); //Then dispatches so page changes
    },
  });

const [email, setEmail] = useState<string>('');
const [password, setPassword] = useState<string>('');
  
const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
  setEmail(e.target.value);
};

const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
  setPassword(e.target.value);
};

const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  // Trigger the mutation
  mutation.mutate({
    email,
    password,
  });
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
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
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
          disabled={mutation.isLoading}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline"
        >
          {mutation.isLoading ? 'Loggin In...' : 'Login'}
        </button>

        {mutation.isError && (
          <div className="text-red-500 mt-2">{(mutation.error as Error).message}</div>
        )}
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
