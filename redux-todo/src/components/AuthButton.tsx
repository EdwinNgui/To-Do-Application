import React, { useState } from "react";
import { RefObject } from "react";

// Custom hooks for redux thunk hooks made by Rahat (see './hooks/thunk')
import { useAppDispatch } from "../hooks/thunk";

//Imports actions
import { AuntheticationAction } from "../actions/AuthActions";

//AuthButton Props
interface AuthButtonProps {
  emailRef: RefObject<HTMLInputElement>;
  passwordRef: RefObject<HTMLInputElement>;
}

export default function AuthButton({ emailRef, passwordRef }: AuthButtonProps) {
  const [showLogin, setShowLogin] = useState(false);
  const dispatch = useAppDispatch();

  const handleAuthentication = () => {
    const activity = showLogin ? "login" : "register";
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    if (email && password)
      dispatch(AuntheticationAction(email, password, activity));
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleAuthentication}
        className={`${
          showLogin
            ? "bg-green-500 hover:bg-green-700"
            : "bg-blue-500 hover:bg-blue-700"
        } text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline`}
        // disabled={AuthMutationObject.isLoading}
      >
        {/* {AuthMutationObject.isLoading ? "Registerring..." : "Register"}
         */}
        {showLogin ? "Login" : "Register"}
      </button>
      {/* {AuthMutationObject.isError && (
          <div className="text-red-500 mt-2">
            {(AuthMutationObject.error as Error).message}
          </div>
        )} */}
      <button
        type="button"
        onClick={() => setShowLogin(!showLogin)}
        className={`block mt-6 text-lg ${
          showLogin
            ? "text-green-500 hover:text-green-700"
            : "text-blue-500 hover:text-blue-700"
        } focus:outline-none`}
      >
        Already have an account? {showLogin ? "Register" : "Login"}
      </button>
    </div>
  );
}
