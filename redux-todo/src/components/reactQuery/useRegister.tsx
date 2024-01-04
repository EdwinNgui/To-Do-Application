import { useMutation, UseMutationResult } from 'react-query';

interface RegisterData {
  username: string;
  password: string;
}

function useRegisterUser(): UseMutationResult<any, unknown, RegisterData, unknown> {
  return useMutation(async (userData: RegisterData) => {
    const response = await fetch(process.env.REACT_APP_REGISTER_ENDPOINT || '', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Failed to register user');
    }

    return response.json();
  });
}

export default useRegisterUser;
