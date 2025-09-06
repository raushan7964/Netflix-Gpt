import React, { useEffect } from "react";
import Login from "./Login";
import Browse from "./Browse";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../Utils/userSlice";
import { PhoneMultiFactorGenerator } from "firebase/auth/web-extension";

function Body() {
  const dispatch = useDispatch();

  const appRouter = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/browse", element: <Browse /> },
  ]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
      } else {
        dispatch(removeUser());
      }
    });

    return () => unsubscribe(); // cleanup listener
  }, [dispatch]);

  return <RouterProvider router={appRouter} />;
}

export default Body;
