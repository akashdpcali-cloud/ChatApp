import './App.css'
import { Routes, Route } from "react-router-dom";

import { Landing } from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Signup from './pages/Signup/Signup';
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from './pages/ResetPassword/ResetPassword';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

    </Routes>
  )
}

export default App
