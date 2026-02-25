// Nav.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const Nav = () => {
  const { logout, isAuthenticated } = useAuth();
  const [isMobile, setIsMobile] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobile(!isMobile)}
        className="flex fixed bottom-5 right-5 h-12 w-12 rounded-full bg-primary grid place-items-center lg:hidden text-white z-50 shadow-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-7 h-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      {/* Sidebar */}
      {isMobile && (
        <header className="fixed h-screen w-[180px] z-40 bg-background border-r border-gray-700 shadow-lg lg:static px-4">
          <Link
            to="/"
            className="flex gap-2 items-center justify-center border-b border-gray-600 py-4"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Swift Logo"
            />
            <span className="font-semibold text-xl">Swift</span>
          </Link>

          <nav className="h-full flex flex-col justify-between py-4">
            {/* Top Section */}
            <div className="flex flex-col gap-5">

              {/* Profile */}
              <Link
                to="/profile"
                className="flex items-center gap-2 hover:text-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75H4.5v-.75z"
                  />
                </svg>
                <span>Profile</span>
              </Link>

              {/* Chats */}
              <Link
                to="/chathome"
                className="flex items-center gap-2 hover:text-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zM12 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zM15.375 12a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                <span>Chats</span>
              </Link>
            </div>

            {/* Logout */}
            <button
              onClick={logout}
              className="flex items-center gap-2 mb-10 hover:text-red-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0110.5 3h6a2.25 2.25 0 012.25 2.25V9M9 14.25L6.75 12m0 0L9 9.75M6.75 12h8.25"
                />
              </svg>
              Logout
            </button>
          </nav>
        </header>
      )}
    </>
  );
};

export default Nav;