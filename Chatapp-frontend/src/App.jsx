import './App.css'
import { Routes, Route } from "react-router-dom";

import { Landing } from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Signup from './pages/Signup/Signup';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path='/signup' element={<Signup />} />
    </Routes>
  )
}

export default App
