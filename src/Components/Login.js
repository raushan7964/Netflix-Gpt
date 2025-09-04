import React from "react";
import Header from "./Header";
import { useState } from "react";

const Login = () => {
  const [signInForm, setSignInForm] = useState(true);
const toogleSignForm = () => {
  setSignInForm(!signInForm);
};

  return (
    <div className="relative h-screen w-screen">
      <Header />

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/cb72daa5-bd8d-408b-b949-1eaef000c377/web/IN-en-20250825-TRIFECTA-perspective_a3209894-0b01-4ddb-b57e-f32165e20a3f_large.jpg"
          alt="background"
          className="h-full w-full object-cover"
        />
        {/* Black overlay for dim effect */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Login Form */}
      <div className="flex justify-center items-center h-full relative z-10">
        <form className="w-96 text-white p-12 bg-black bg-opacity-80 rounded-lg">
          <h1 className="font-bold text-3xl py-4">{signInForm ? "Sign In" : "Sign Up"}</h1>
          {!signInForm && (
              <input
            type="text"
            placeholder="Full name"
            className="p-3 my-2 w-full bg-gray-800 rounded text-white"
          />
          )}
        
          <input
            type="text"
            placeholder="Email"
            className="p-3 my-2 w-full bg-gray-800 rounded text-white"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 my-2 w-full bg-gray-800 rounded text-white"
          />
          <button className="p-3 my-4 w-full bg-red-700 rounded hover:bg-red-800">
          {signInForm ? "Sign In" : "Sign Up"}
          </button>

          <div className="flex justify-between text-sm text-gray-400">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Remember me
            </label>
            <p className="cursor-pointer hover:underline">Need help?</p>
          </div>

          <p className="text-sm text-gray-400 mt-6" onClick={toogleSignForm}>
            {signInForm ? "New to Netflix? Sign up now" : "Already registered? Sign in now"}
            <span className="text-white hover:underline cursor-pointer">
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
