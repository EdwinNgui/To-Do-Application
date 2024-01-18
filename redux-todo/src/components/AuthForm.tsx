import React, { useRef } from "react";
import AuthButton from "./AuthButton";

//useMutation hook handles the HTTP request to API endpoint
export default function AuthForm() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  return (
    <div className="w-full max-w-md mx-auto">
      <form className="bg-white shadow-md rounded-lg px-10 pt-8 pb-10">
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-bold mb-4">
            Email:
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="Email"
              ref={emailRef}
            />
          </label>
          <label className="block text-gray-700 text-lg font-bold mb-4">
            Password:
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-lg text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="Password"
              ref={passwordRef}
            />
          </label>
        </div>
        <AuthButton emailRef={emailRef} passwordRef={passwordRef} />
      </form>
    </div>
  );
}
