import React from "react";
import { auth, provider, signInWithPopup, signOut } from "../firebase";

function Auth({ user, setUser }) {
  const login = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div className="p-4 flex justify-between items-center bg-white shadow">
      {user ? (
        <div className="flex items-center space-x-4">
          <img src={user.photoURL} alt="profile" className="w-10 h-10 rounded-full" />
          <span>{user.displayName}</span>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={login}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Sign in with Google
        </button>
      )}
    </div>
  );
}

export default Auth;
