import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Signup = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const [isError, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Passwords don't match");
      setError(true);
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5000/signup",
          formData
        );
        console.log(response.data);
        navigate("/login");
      } catch (error) {
        setError(true);
        if (!error.response) {
          setErrorMsg(error.message);
        } else {
          setErrorMsg(error.response.data);
        }
        console.log(error);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col h-[calc(100vh-52px)] justify-center w-4/5 max-w-md mx-auto">
        <h1 className="text-3xl font-medium font-lora">Sign Up</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col border border-slate-300 rounded shadow-lg my-4 p-4 gap-1 font-lora"
        >
          <label htmlFor="name" className="text-left text-xl">
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="text-xl border border-slate-200 rounded p-1"
            placeholder="Your name"
            required
          />
          <label htmlFor="email" className="text-left text-xl">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="text-xl border border-slate-200 rounded p-1"
            placeholder="Your email"
            required
          />
          <label htmlFor="password" className="text-left text-xl">
            Password:
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="text-xl border border-slate-200 rounded p-1"
            placeholder="Your password"
            required
          />
          <label htmlFor="confirmPassword" className="text-left text-xl">
            Confirm Password:
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="text-xl border border-slate-200 rounded p-1"
            placeholder="Re-enter password"
            required
          />
          {isError && (
            <p className="bg-red-200 border border-red-700 text-red-700 text-xl rounded p-1">
              {errorMsg}
            </p>
          )}
          <button className="text-xl bg-slate-600 rounded text-white p-1 hover:opacity-90">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
