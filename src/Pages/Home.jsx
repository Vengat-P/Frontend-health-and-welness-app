import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleLocate = () => {
    navigate("/personaldetails");
  };
  const handleChange = ()=>{
    navigate("/fitness");
  }
  return (
    <div className="flex justify-around">
      <button
        type="button"
        onClick={handleLocate}
        className="p-2 bg-gray-600 rounded-lg text-white"
      >
        My Fitness Info
      </button>
      <button
        type="button"
        onClick={handleChange}
        className=" flex p-2 bg-gray-600 rounded-lg text-white"
      >
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
          />
        </svg>

        <p>FitnessLog</p>
      </button>
    </div>
  );
};

export default Home;
