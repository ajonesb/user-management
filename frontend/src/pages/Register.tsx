// src/pages/Register.tsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../store";
import Button from "../components/common/Button";
import { register } from "../store/authSlice";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const result = await dispatch(
        register({ name, email, password })
      ).unwrap();
      setSuccess(result.message || "Registration successful!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setError("Registration failed. Please try again.");
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="bg-sky-900 p-10 max-w-md mx-auto rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <h2 className="text-2xl font-bold mb-2 text-white">Register</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <div>
          <label htmlFor="name" className="block mb-1 text-sky-400">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1 text-sky-400">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1 text-sky-400">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
};

export default Register;
