import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { UserContext } from "../Context/UserContext";

const Nutrition = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    food: "",
    carbohydrate: "",
    protein: "",
    fat: "",
    vitamin: "",
    minerals: "",
    nutritiongoal: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://fit2go-app.onrender.com/api/nutritions/create",
        userData,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      toast.success("fitness log creates Succesfully");
      navigate("/home");
    } catch (error) {
      toast.error("error in create nutrition log ");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white/60 backdrop-blur-md shadow-xl rounded-xl p-10 w-full max-w-md border border-white/40"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Enter the Intake details
        </h2>

        <input
          type="text"
          placeholder="Enter Food Name"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setUserData({ ...userData, food: e.target.value })}
        />
        <input
          type="tel"
          placeholder="Enter carbohydrate in gram"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) =>
            setUserData({ ...userData, carbohydrate: e.target.value })
          }
        />
        <input
          type="tel"
          placeholder="Enter protein in gram"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) =>
            setUserData({ ...userData, protein: e.target.value })
          }
        />
        <input
          type="tel"
          placeholder="Enter fat in gram"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setUserData({ ...userData, fat: e.target.value })}
        />
        <input
          type="text"
          placeholder="Enter vitamin details"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) =>
            setUserData({ ...userData, vitamin: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Enter minerals"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) =>
            setUserData({ ...userData, minerals: e.target.value })
          }
        />
        <select
          onChange={(e) =>
            setUserData({ ...userData, nutritiongoal: e.target.value })
          }
          required
          className="border p-2 mt-2 mb-4 rounded w-full"
        >
          <option value="select">Select Goal</option>
          <option value="muscle gain">muscle gain</option>
          <option value="weight lose">weight lose</option>
        </select>
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

export default Nutrition;
