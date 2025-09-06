import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../Utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();

  // 🔹 Fetch user from Redux store
  const user = useSelector((state) => state.user);

  // 🔹 Handle Sign Out
  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        navigate("/"); // Redirect to home after logout
      })
      .catch((error) => {
        console.error("Sign Out Error:", error); // Debug error
        navigate("/error");
      });
  };

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between items-center">
      {/* 🔹 Logo */}
      <img
        className="w-44"
        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-08-26/consent/87b6a5c0-0104-4e96-a291-092c11350111/0198e689-25fa-7d64-bb49-0f7e75f898d2/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="Logo"
      />

      {/* 🔹 User Profile & Logout */}
      {user && (
        <div className="flex items-center gap-4">
          <img
            src={user?.photoURL}
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <button
            onClick={handleSignout}
            className="text-white hover:text-red-500"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
