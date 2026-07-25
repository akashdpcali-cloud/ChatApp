import { Mail } from "lucide-react";
import { Link } from "react-router-dom";

import "./ForgotPassword.css";

function ForgotPassword() {
  return (
    <>
      <div className="forgot-app-title">
        Chat App
      </div>

      <div className="forgot-box">

        <div className="forgot-title">
          Forgot Password?
        </div>

        <div className="forgot-message">
          Enter your email to request a reset link.
        </div>

        <div className="email-box">

          <Mail className="user-avarar" />

          <input
            type="email"
            className="email-input"
            placeholder="Email"
          />

        </div>

        <button className="request-reset-button">
          REQUEST RESET LINK
        </button>

        <Link
          to="/login"
          className="back-link"
        >
          Back to Login
        </Link>

      </div>
    </>
  );
}

export default ForgotPassword;