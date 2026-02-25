import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/authContext";
import "../styles/auth.css";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { isAuthenticated, setAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = "/api/user/login";

      const response = await axios.post(url, data, {
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success("Login Successful");
        setAuthenticated(true);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-wrapper">
        <div className="auth-card">
          <h1 className="auth-title">Sign in to your account</h1>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="email" className="auth-label">
                Your email
              </label>
              <input
                onChange={handleChange}
                value={data.email}
                type="email"
                name="email"
                id="email"
                placeholder="name@company.com"
                required
                className="auth-input"
              />
            </div>

            <div className="auth-field">
              <label htmlFor="password" className="auth-label">
                Password
              </label>
              <input
                onChange={handleChange}
                value={data.password}
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                required
                className="auth-input"
              />
            </div>

            <div className="auth-row">
              <div className="auth-checkbox-row">
                <input id="remember" type="checkbox" className="auth-checkbox" />
                <label htmlFor="remember" className="auth-muted">
                  Remember me
                </label>
              </div>

              <a href="#" className="auth-link">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="auth-button">
              Sign in
            </button>

            <p className="auth-muted">
              Don’t have an account yet?{" "}
              <Link to="/register" className="auth-link">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
