import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { UserContext } from "../Context/UserContext";

const PersonalDetails = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [status, setStatus] = useState(true);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    fetchData();
  }, [user,navigate]);
  const fetchData = async () => {
    try {
      const res = await axios.get("https://fit2go-app.onrender.com/api/auth/getUser", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setUserData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://fit2go-app.onrender.com/api/auth/update/${userData._id}`, userData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
    
      toast.success("User details updated Succesfully");
      navigate("/personaldetails");
      setStatus(true)
    } catch (error) {
      toast.error("error in Register user");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      {status ? (
        <div className="bg-white/60 backdrop-blur-md shadow-xl rounded-xl p-10 w-full max-w-md border border-white/40">
          <div className="flex justify-between">
            <h2 className="text-3xl font-bold text-center mb-3 text-gray-800">
              My Info
            </h2>
            <button
              type="button"
              className="flex justify-center items-center"
              onClick={() => setStatus(false)}
            >
              <svg
                className="w-6 h-6 cursor-pointer text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="square"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h1m4-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm7.441 1.559a1.907 1.907 0 0 1 0 2.698l-6.069 6.069L10 19l.674-3.372 6.07-6.07a1.907 1.907 0 0 1 2.697 0Z"
                />
              </svg>
            </button>
          </div>
          <div className="flex ">
            <h1 className="text-2xl w-1/3 p-3 mb-4 text-blue-600">Name</h1>
            <h1 className="text-2xl w-full p-3 mb-4 border border-gray-300 rounded-lg">
              {userData.name}
            </h1>
          </div>
          <div className="flex  ">
            <h1 className="text-2xl w-1/4 p-3 mb-4 text-blue-600">Gender</h1>
            <h1 className="text-2xl w-full p-3 mb-4 border border-gray-300 rounded-lg">
              {userData.gender}
            </h1>
          </div>
          <div className="flex ">
            <h1 className="text-2xl w-1/3 p-3 mb-4 text-blue-600">Age </h1>
            <h1 className="text-2xl w-full p-3 mb-4 border border-gray-300 rounded-lg">
              {userData.age}
            </h1>
          </div>
          <div className="flex ">
            <h1 className="text-2xl w-1/3 p-3 mb-4 text-blue-600">Height</h1>
            <h1 className="text-2xl w-full p-3 mb-4 border border-gray-300 rounded-lg">
              {userData.height}
            </h1>
          </div>
          <div className="flex ">
            <h1 className="text-2xl p-3 mb-4 text-blue-600">Weight</h1>
            <h1 className="text-2xl w-full p-3 mb-4 border border-gray-300 rounded-lg">
              {userData.weight}
            </h1>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleRegister}
          className="bg-white/60 backdrop-blur-md shadow-xl rounded-xl p-10 w-full max-w-md border border-white/40"
        >
          <div className="flex justify-between">
            <h2 className="text-3xl font-bold text-center mb-3 text-gray-800">
              My Info
            </h2>
          </div>
          <div className="flex ">
            <h1 className="text-2xl w-1/3 p-3 mb-4 text-blue-600">Name</h1>
            <input
            type="text"
            placeholder="Enter Your Name"
            value={userData.name}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />
          </div>
          <div className="flex  ">
            <h1 className="text-2xl w-1/4 p-3 mb-4 text-blue-600">Gender</h1>
            <input
            type="text"
            placeholder="Enter Your Gender"
            value={userData.gender}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setUserData({ ...userData, gender: e.target.value })
            }
          />
          </div>
          <div className="flex ">
            <h1 className="text-2xl w-1/3 p-3 mb-4 text-blue-600">Age </h1>
            <input
            type="tel"
            placeholder="Enter Your Age"
            value={userData.age}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setUserData({ ...userData, age: e.target.value })}
          />
          </div>
          <div className="flex ">
            <h1 className="text-2xl w-1/3 p-3 mb-4 text-blue-600">Height</h1>
            <input
            type="tel"
            placeholder="Enter Your height in cm"
            value={userData.height}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setUserData({ ...userData, height: e.target.value })
            }
          />
          </div>
          <div className="flex ">
            <h1 className="text-2xl p-3 mb-4 text-blue-600">Weight</h1>
            <input
            type="tel"
            placeholder="Enter Your Weight in kg"
            value={userData.weight}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setUserData({ ...userData, weight: e.target.value })
            }
          />
          </div>
          
          
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Update
          </button>
        </form>
      )}
    </div>
  );
};

export default PersonalDetails;
