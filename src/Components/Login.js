import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Header from "./Header";
import checkValidate from "../Utils/Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";

const Login = () => {
  // State
  const [signInForm, setSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Form References
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignForm = () => {
    setSignInForm(!signInForm);
  };

  const handleButtonClick = () => {
    // Validate email & password
    const message = checkValidate(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    // Sign Up
    if (!signInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;

          // Update profile with display name & photo
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://example.com/default-profile.jpg",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName, photoURL }));
              navigate("/browse");
            })
            .catch((error) => {
              setErrorMessage(error.code + " - " + error.message);
            });
        })
        .catch((error) => {
          setErrorMessage(error.code + " - " + error.message);
        });

      // Sign In
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          navigate("/browse");
        })
        .catch((error) => {
          setErrorMessage(error.code + " - " + error.message);
        });
    }
  };

  return (
    <div className="relative h-screen w-screen">
      <Header />
      <div className="absolute inset-0 z-0">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/cb72daa5-bd8d-408b-b949-1eaef000c377/web/IN-en-20250825-TRIFECTA-perspective_a3209894-0b01-4ddb-b57e-f32165e20a3f_large.jpg"
          alt="background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Login / Signup Form */}
      <div className="flex justify-center items-center h-full relative z-10">
        <form
          className="w-96 text-white p-12 bg-black bg-opacity-80 rounded-lg"
          onSubmit={(e) => e.preventDefault()}
        >
          <h1 className="font-bold text-3xl py-4">
            {signInForm ? "Sign In" : "Sign Up"}
          </h1>

          {!signInForm && (
            <input
              ref={name}
              type="text"
              placeholder="Full name"
              className="p-3 my-2 w-full bg-gray-800 rounded text-white"
            />
          )}

          <input
            ref={email}
            type="text"
            placeholder="Email"
            className="p-3 my-2 w-full bg-gray-800 rounded text-white"
          />

          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="p-3 my-2 w-full bg-gray-800 rounded text-white"
          />

          <p className="text-red-500 text-lg py-2">{errorMessage}</p>

          <button
            className="p-3 my-4 w-full bg-red-700 rounded hover:bg-red-800"
            onClick={handleButtonClick}
          >
            {signInForm ? "Sign In" : "Sign Up"}
          </button>

          <div className="flex justify-between text-sm text-gray-400">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Remember me
            </label>
            <p className="cursor-pointer hover:underline">Need help?</p>
          </div>

          <p className="text-sm text-gray-400 mt-6" onClick={toggleSignForm}>
            {signInForm
              ? "New to Netflix? Sign up now"
              : "Already registered? Sign in now"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
