import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const SetGoal = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    goal: "",
    from: "",
    to: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/goal/create", userData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
        navigate("/home");
    } catch (error) {
      toast.error("error in create goal ");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white/60 backdrop-blur-md shadow-xl rounded-xl p-10 w-full max-w-md border border-white/40"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Create your Goal 
        </h2>
        <input
          type="text"
          placeholder="Enter your Goal Name"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setUserData({ ...userData, goal: e.target.value })}
        />
        <input
          type="date"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setUserData({ ...userData, from: e.target.value })}
        />
        <input
          type="date"
          placeholder="Enter Duration in Minutes"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setUserData({ ...userData, to: e.target.value })}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default SetGoal;
