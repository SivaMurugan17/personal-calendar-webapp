import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.setItem("user", null);
    navigate("/login");
  };
  return (
    <div className="bg-slate-600 text-white text-3xl py-2 sticky top-0">
      <nav className="flex flex-row justify-between items-center max-w-4xl mx-auto px-4">
        <Link to="/" className="hover:text-slate-300">
          <h1 className="font-cinzel">📅Remindme</h1>
        </Link>
        <div className="md:flex md:flex-row gap-8 font-lora hidden">
          <p className="text-slate-300">
            {JSON.parse(localStorage.getItem("user"))?.name}
          </p>
          {!JSON.parse(localStorage.getItem("user")) && (
            <Link to="/login" className="hover:text-slate-300">
              Login
            </Link>
          )}
          {!JSON.parse(localStorage.getItem("user")) && (
            <Link to="/signup" className="hover:text-slate-300">
              Signup
            </Link>
          )}
          {JSON.parse(localStorage.getItem("user")) && (
            <button onClick={handleLogout} className="hover:text-slate-300">
              Logout
            </button>
          )}
        </div>
        {!isOpen && (
          <button className="md:hidden" onClick={() => setIsOpen(true)}>
            &#9776;
          </button>
        )}
        {isOpen && (
          <button className="md:hidden" onClick={() => setIsOpen(false)}>
            &times;
          </button>
        )}
      </nav>
      <div
        className={`flex flex-col gap-6 py-6 w-full fixed bg-slate-600 transition-all ease-in duration-500 ${
          isOpen ? "" : "hidden"
        }`}
      >
        <p className="text-slate-300">
          {JSON.parse(localStorage.getItem("user"))?.name}
        </p>
        {!JSON.parse(localStorage.getItem("user")) && (
          <Link to="/login" className="hover:text-slate-300">
            Login
          </Link>
        )}
        {!JSON.parse(localStorage.getItem("user")) && (
          <Link to="/signup" className="hover:text-slate-300">
            Signup
          </Link>
        )}
        {JSON.parse(localStorage.getItem("user")) && (
          <button onClick={handleLogout} className="hover:text-slate-300">
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
