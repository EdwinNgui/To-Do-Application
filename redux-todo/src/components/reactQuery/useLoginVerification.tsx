import { useMutation, UseMutationResult } from 'react-query';

interface LoginData {
  username: string;
  password: string;
}

function useLoginVerification(): UseMutationResult<any, unknown, LoginData, unknown> {
  return useMutation(async (loginData: LoginData) => {
    const response = await fetch(process.env.REACT_APP_LOGIN_ENDPOINT || '', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      throw new Error('Failed to verify user login');
    }

    return response.json();
  });
}

export default useLoginVerification;
