import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

const LandingNav = () => {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="bg-gray-900 border-b border-gray-700">
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p-4">

        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Swift Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Swift-Chat
          </span>
        </Link>

        {/* Mobile Hamburger */}
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-400 rounded-lg md:hidden hover:bg-gray-700"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            fill="none"
            viewBox="0 0 17 14"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6" id="navbar-default">
          <Link
            to={isAuthenticated ? "/chathome" : "/login"}
            className="py-2 px-3 text-white hover:text-indigo-400 transition"
          >
            {isAuthenticated ? "Home" : "Login"}
          </Link>

          <a
            href="#"
            className="py-2 px-3 text-white hover:text-indigo-400 transition"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default LandingNav;