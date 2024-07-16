// src/App.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "./store/authSlice";
import Home from "./pages/Home";
import UserForm from "./pages/UserForm";
import Navbar from "./components/NavBar";

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return isAuthenticated ? children : <Navigate to="/" />;
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-black">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/users/new"
              element={
                <PrivateRoute>
                  <UserForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/users/:id"
              element={
                <PrivateRoute>
                  <UserForm />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
