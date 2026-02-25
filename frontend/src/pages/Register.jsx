import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import "../styles/auth.css";

const Register = () => {
  const [data, setData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = "/api/user/register";
      const { data: res } = await axios.post(url, data);

      console.log(res.message);
      toast.success(res.message);
    } catch (error) {
      if (error.response && error.response.status >= 300 && error.response.status <= 500) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-wrapper">
        <div className="auth-card">
          <h1 className="auth-title">Create an account</h1>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="email" className="auth-label">Your email</label>
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

            <div className="auth-name-grid">
              <div className="auth-field">
                <label htmlFor="firstName" className="auth-label">First Name</label>
                <input
                  onChange={handleChange}
                  value={data.firstName}
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="John"
                  required
                  className="auth-input"
                />
              </div>

              <div className="auth-field">
                <label htmlFor="lastName" className="auth-label">Last Name</label>
                <input
                  onChange={handleChange}
                  value={data.lastName}
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Doe"
                  required
                  className="auth-input"
                />
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="password" className="auth-label">Password</label>
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

            <div className="auth-checkbox-row">
              <input
                id="terms"
                type="checkbox"
                required
                className="auth-checkbox"
              />
              <label htmlFor="terms" className="auth-muted">
                I accept the {" "}
                <a href="#" className="auth-link">
                  Terms and Conditions
                </a>
              </label>
            </div>

            <button type="submit" className="auth-button">
              Create an account
            </button>

            <p className="auth-muted">
              Already have an account?{" "}
              <Link to="/login" className="auth-link">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
