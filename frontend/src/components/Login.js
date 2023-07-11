import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Login = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const [isError, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        formData
      );
      console.log(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/");
    } catch (error) {
      setError(true);
      if (!error.response) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg(error.response.data);
      }
      console.log(error);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex flex-col h-[calc(100vh-52px)] justify-center w-4/5 max-w-md mx-auto">
        <h1 className="text-3xl font-medium font-lora">Log In</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col border border-slate-300 rounded shadow-lg my-4 p-4 gap-1 font-lora"
        >
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
          {isError && (
            <p className="bg-red-200 border border-red-700 text-red-700 text-xl rounded p-1">
              {errorMsg}
            </p>
          )}
          <button className="text-xl bg-slate-600 rounded text-white p-1 hover:opacity-90">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
