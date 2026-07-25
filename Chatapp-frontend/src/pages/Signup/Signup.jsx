import { useState } from "react";

import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff
} from "lucide-react";

import "./Signup.css";

import { Link } from "react-router-dom";

function Signup() {

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  return (
    <>

      <div className="signup-page">

        <div className="signup-app-title">Chat App</div>

        <div className="signup-box">

          <div className="signup-title">
            SIGN UP
          </div>

          <div className="fullname-box">

            <User className="fullname-avater" />

            <input
              type="text"
              className="fullname-input"
              placeholder="Full Name"
            />

          </div>

          <div className="mail-box">

            <Mail className="user-avater" />

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

          <div className="conferm-password">

            <Lock className="password-icon" />

            <input
              type={showConfirmPassword ? "text" : "password"}
              className="password-input"
              placeholder="Confirm Password"
            />

            {showConfirmPassword ? (
              <EyeOff
                className="password-toggle"
                onClick={() =>
                  setShowConfirmPassword(false)
                }
              />
            ) : (
              <Eye
                className="password-toggle"
                onClick={() =>
                  setShowConfirmPassword(true)
                }
              />
            )}

          </div>

          <button className="signup-button">
            SIGN UP
          </button>

          <div className="seperation-line">
            Or signup with
          </div>

          <div className="signup-with-google-div">

            <img
              src="/google-icon.svg"
              alt=""
              className="google-icon"
            />

          </div>

          <div className="login-message">

            Already have an account?

            <Link to="/login" className="login-link">
              Login
            </Link>

          </div>

        </div>

      </div>


    </>
  )
}

export default Signup;