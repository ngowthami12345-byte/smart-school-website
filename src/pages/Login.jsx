

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: email.trim().toLowerCase(),
          password,
        }
      );

      const token = response.data.token;

      if (!token) {
        setError("Login failed. Server did not return a token.");
        return;
      }

      localStorage.setItem("token", token);
      navigate("/admin");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to login. Please check your details and server."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-image">
        <div className="login-image-overlay">

          <div className="login-brand">
            <div className="login-logo">SV</div>
            <h2>SRI VENKATESWARA</h2>
            <p>HIGH SCHOOL · KODUMUR</p>
          </div>

          <div className="login-image-text">
            <h1>Welcome Back!</h1>
            <h2>Learn. Grow. Achieve.</h2>
            <p>
              Empowering young minds through quality education.
            </p>
          </div>

        </div>
      </div>

      <div className="login-form-section">
        <div className="login-card">

          <Link to="/" className="back-home">
            ← Back to Home
          </Link>

          <span className="login-label">ADMINISTRATION</span>

          <h1>Admin Login</h1>

          <p className="login-description">
            Sign in to access your school dashboard.
          </p>

          <form onSubmit={handleLogin}>

            <div className="login-input-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="Enter admin email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="login-input-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="login-submit"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In to Dashboard"}
            </button>

          </form>

          <p className="login-footer">
            Sri Venkateswara High School
            <br />
            Kodumur, Kurnool, Andhra Pradesh
          </p>

        </div>
      </div>

    </div>
  );
}

export default Login;
