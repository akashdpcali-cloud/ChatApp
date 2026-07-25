import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

import "./ResetPassword.css";

function ResetPassword() {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <>
      <div className="reset-password-app-title">
        Chat App
      </div>

      <div className="reset-password-box">

        <div className="reset-password-title">
          Reset Password
        </div>

        <div className="password-box1">

          <Lock className="password-avarar" />

          <input
            type={showPassword ? "text" : "password"}
            className="password-input"
            placeholder="New Password"
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

        <div className="password-box2">

          <Lock className="password-avarar" />

          <input
            type={showConfirmPassword ? "text" : "password"}
            className="password-input comferm-password-input"
            placeholder="Confirm Password"
          />

          {showConfirmPassword ? (
            <EyeOff
              className="password-toggle"
              onClick={() => setShowConfirmPassword(false)}
            />
          ) : (
            <Eye
              className="password-toggle"
              onClick={() => setShowConfirmPassword(true)}
            />
          )}

        </div>

        <button className="password-request-button">
          RESET PASSWORD
        </button>

        <Link
          to="/signup"
          className="signup-back-link"
        >
          Back to Signup
        </Link>

      </div>
    </>
  );
}

export default ResetPassword;