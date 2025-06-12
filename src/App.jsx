import React, { useContext, useEffect } from "react";
import Navbar from "./Components/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ForgotPassword from "./Pages/ForgotPassword";
import NotFound from "./Pages/NotFound";
import Fitness from "./Pages/Fitness";
import Goal from "./Pages/Goal";
import Nutrition from "./Pages/Nutrition";
import ResetPassword from "./Pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import AdminDashboard from "./Admin/AdminDashboard";
import { UserContext } from "./Context/UserContext";

const App = () => {
  const { user } = useContext(UserContext);
  useEffect(() => {
  
  }, [user]);
  return (
    <>
      <div>
        <ToastContainer />
      </div>
      <div>
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/fitness" element={<Fitness />} />
        <Route path="/Goal" element={<Goal />} />
        <Route path="/nutrition" element={<Nutrition />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
        <Route
          path="/admin"
          element={
            user && user.role?.toLowerCase() === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
