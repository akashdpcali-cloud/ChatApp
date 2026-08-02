import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import ErrorPopup from "../../components/ErrorPopup/ErrorPopup";

import { changePassword } from "../../api/authApi";

import "./ChangePassword.css";

function ChangePassword() {
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChangePassword = async () => {
    try {
      const data = await changePassword(currentPassword, newPassword);

      if (data.success) {
        setCurrentPassword("");
        setNewPassword("");

        navigate("/landing");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <>
      <div className="change-password-app-title">Chat App</div>

      <div className="change-password-box">
        <div className="change-password-title">Change Password</div>

        <div className="password-box">
          <Lock className="password-avatar" />

          <input
            type={showCurrentPassword ? "text" : "password"}
            className="password-input"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />

          {showCurrentPassword ? (
            <EyeOff
              className="password-toggle"
              onClick={() => setShowCurrentPassword(false)}
            />
          ) : (
            <Eye
              className="password-toggle"
              onClick={() => setShowCurrentPassword(true)}
            />
          )}
        </div>

        <div className="password-box">
          <Lock className="password-avatar" />

          <input
            type={showNewPassword ? "text" : "password"}
            className="password-input"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          {showNewPassword ? (
            <EyeOff
              className="password-toggle"
              onClick={() => setShowNewPassword(false)}
            />
          ) : (
            <Eye
              className="password-toggle"
              onClick={() => setShowNewPassword(true)}
            />
          )}
        </div>

        <button
          className="change-password-button"
          onClick={handleChangePassword}
        >
          CHANGE PASSWORD
        </button>

        <Link to="/" className="profile-back-link">
          Back to Profile
        </Link>
      </div>
      <ErrorPopup message={errorMessage} onClose={() => setErrorMessage("")} />
    </>
  );
}

export default ChangePassword;
