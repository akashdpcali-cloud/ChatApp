import './App.css'
import { Routes, Route } from "react-router-dom";

import { useEffect } from "react";
import { getCurrentUser } from "./api/authApi";
import useAuthStore from "./store/authStore";

import { Landing } from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Signup from './pages/Signup/Signup';
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from './pages/ResetPassword/ResetPassword';

function App() {

  const setUser = useAuthStore(
    (state) => state.setUser
);


useEffect(() => {

    const fetchUser = async () => {

        const token = localStorage.getItem("token");

        if(!token) return;


        try {

            const data = await getCurrentUser();

            if(data.success){

                setUser(data.data.user);

            }

        } catch(error){

            console.log(
                error.response?.data?.message
            );

        }

    };


    fetchUser();

}, []);


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
