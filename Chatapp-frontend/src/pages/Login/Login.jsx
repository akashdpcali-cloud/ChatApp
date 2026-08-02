import { useState } from "react";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { socket } from "../../socket/socket";

import "./Login.css";

import { loginUser } from "../../api/authApi";
import useAuthStore from "../../store/authStore";

import { Link, useNavigate } from "react-router-dom";

import ErrorPopup from "../../components/ErrorPopup/ErrorPopup";

function Login() {
  const [errorMessage, setErrorMessage] = useState("");

  const setUser = useAuthStore((state) => state.setUser);

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await loginUser({
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
      <div className="login-app-title">Chat App</div>

      <div className="login-box">
        <div className="login-title">LOGIN</div>

        <div className="mail-box">
          <User className="user-avater" />

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

        <button className="login-button" onClick={handleLogin}>
          LOGIN
        </button>

        <div className="seperation-line">Or login with</div>

        <div className="login-with-google-div">
          <img src="/google-icon.svg" alt="" className="google-icon" />
        </div>

        <div className="signup-message">
          Don't have an account?
          <Link to="/signup" className="signup-link">
            Sign up
          </Link>
        </div>
      </div>

      <ErrorPopup message={errorMessage} onClose={() => setErrorMessage("")} />
    </>
  );
}

export default Login;
