// src/pages/Home.tsx
import React from "react";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../store/authSlice";
import Login from "./Login";
import Register from "./Register";
import UserList from "./UserList";

const Home: React.FC = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    return <UserList />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to User Management</h1>
      <p className="mb-4">Please log in or register to continue.</p>
      <div className="flex space-x-4">
        <div className="w-1/2">
          <h2 className="text-2xl font-bold mb-2">Login</h2>
          <Login />
        </div>
        <div className="w-1/2">
          <h2 className="text-2xl font-bold mb-2">Register</h2>
          <Register />
        </div>
      </div>
    </div>
  );
};

export default Home;