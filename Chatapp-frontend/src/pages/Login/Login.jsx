import { useState } from "react";
import {
  User,
  Lock,
  Eye,
  EyeOff
} from "lucide-react";

import "./Login.css";

import { Link } from "react-router-dom";

function Login() {

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="login-app-title">Chat App</div>

      <div className="login-box">

        <div className="login-title">
          LOGIN
        </div>

        <div className="mail-box">

          <User className="user-avater" />

          <input
            type="email"
            className="mail-input"
            placeholder="Email"
          />

        </div>

        <div className="password-box">

          <Lock className="password-icon" />

          <input
            type={showPassword ? "text" : "password"}
            className="password-input"
            placeholder="Password"
          />

          {showPassword ? (
            <EyeOff
              className="password-toggle"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <Eye
              className="password-toggle"
              onClick={() => setShowPassword(true)}
            />
          )}

        </div>

        <button className="login-button">
          LOGIN
        </button>

        <a href="" className="forgot-password">
          Forgot Password?
        </a>

        <div className="seperation-line">
          Or login with
        </div>

        <div className="login-with-google-div">

          <img
            src="/google-icon.svg"
            alt="" 
            className="google-icon"
          />

        </div>

        <div className="signup-message">

          Don't have an account? 

          <Link to="/signup" className="signup-link">
            Sign up
          </Link>

        </div>

      </div>
    </>
  )
}

export default Login;