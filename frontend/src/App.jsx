import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  ScrollRestoration,
} from "react-router-dom";

import "./App.css";
import './index.css';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ChatHome from "./pages/ChatHome";
import VerifyEmail from "./pages/VerifyEmail";

import { Toaster } from "react-hot-toast";

import { AuthProvider, useAuth } from "./context/authContext";
import { ProfileProvider } from "./context/profileContext";

import axios from "axios";
import { useEffect } from "react";

// Correct path for API config:
import { baseUrl } from "./config/apiConfig";
import Profile from "./components/Profile";


// -------------------- Layout Wrapper --------------------

const Layout = () => {
  const { isAuthenticated, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [isAuthenticated]);

  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  );
};


// -------------------- Router Config --------------------

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "users/:id/verify/:token", element: <VerifyEmail /> },
      { path: "chathome", element: <ChatHome /> },
      { path: "profile", element: <Profile /> },
    ],
  },
]);


// -------------------- Main App --------------------

function App() {
  axios.defaults.baseURL = baseUrl;
  axios.defaults.withCredentials = true;

  return (
    <>
      <AuthProvider>
        <ProfileProvider>
          <RouterProvider router={router} />
          <Toaster />
        </ProfileProvider>
      </AuthProvider>
    </>
  );
}

export default App;