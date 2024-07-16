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
      <h1 className="text-3xl font-bold mb-4 text-white">Welcome to User Management</h1>
      <p className="mb-4 text-sky-400">Please log in or register to continue.</p>
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
        <div className="w-full md:w-1/2">
          <Login />
        </div>
        <div className="w-full md:w-1/2">
          <Register />
        </div>
      </div>
    </div>
  );
};

export default Home;