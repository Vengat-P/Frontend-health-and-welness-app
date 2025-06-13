import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { UserContext } from "../Context/UserContext";

const Fitness = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    exercises: "",
    duration: "",
    distance: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/fitnesses/create", userData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      toast.success("fitness log creates Succesfully");
      navigate("/home");
    } catch (error) {
      toast.error("error in create fitness log ");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white/60 backdrop-blur-md shadow-xl rounded-xl p-10 w-full max-w-md border border-white/40"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Hey what you did Today
        </h2>

        <input
          type="text"
          placeholder="Enter Exercise Name"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) =>
            setUserData({ ...userData, exercises: e.target.value })
          }
        />
        <input
          type="tel"
          placeholder="Enter Duration in Minutes"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) =>
            setUserData({ ...userData, duration: e.target.value })
          }
        />
        <input
          type="tel"
          placeholder="Enter Distance in Kilo meters"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) =>
            setUserData({ ...userData, distance: e.target.value })
          }
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

export default Fitness;
