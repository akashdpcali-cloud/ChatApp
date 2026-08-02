import { useState } from "react";

import ErrorPopup from "../../components/ErrorPopup/ErrorPopup";

import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { socket } from "../../socket/socket";

import "./Signup.css";

import { registerUser } from "../../api/authApi";
import useAuthStore from "../../store/authStore";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [errorMessage, setErrorMessage] = useState("");

  const setUser = useAuthStore((state) => state.setUser);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const data = await registerUser({
        fullName,
        email,
        password,
      });

      if (data.success) {
        localStorage.setItem("token", data.data.token);

        localStorage.setItem("user", JSON.stringify(data.data.user));

        setUser(data.data.user);

        socket.connect();

        navigate("/landing");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <>
      <div className="signup-page">
        <div className="signup-app-title">Chat App</div>

        <div className="signup-box">
          <div className="signup-title">SIGN UP</div>

          <div className="fullname-box">
            <User className="fullname-avater" />

            <input
              type="text"
              className="fullname-input"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="mail-box">
            <Mail className="user-avater" />

            <input
              type="email"
              className="mail-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="password-box">
            <Lock className="password-icon" />

            <input
              type={showPassword ? "text" : "password"}
              className="password-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          <button className="signup-button" onClick={handleSignup}>
            SIGN UP
          </button>

          <div className="seperation-line">Or signup with</div>

          <div className="signup-with-google-div">
            <img src="/google-icon.svg" alt="" className="google-icon" />
          </div>

          <div className="login-message">
            Already have an account?
            <Link to="/" className="login-link">
              Login
            </Link>
          </div>
        </div>
      </div>

      <ErrorPopup message={errorMessage} onClose={() => setErrorMessage("")} />
    </>
  );
}

export default Signup;
