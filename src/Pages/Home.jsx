import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import axios from "axios";
import BarChart from "../Chart/BarChart";

const Home = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [nutritionLogs, setNutritionLogs] = useState([]);
  const [fitnessLogs, setFitnessLogs] = useState([]);
  //set date ranges to show chart
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [datesRange, setDatesRange] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Calories burn",
        data: [],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
        ],
        borderColor: "rgba(0, 0, 0, 1)",
        borderWidth: 1,
      },
      {
        label: "calories taken",
        data: [],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
        ],
        borderColor: "rgba(0, 0, 0, 1)",
        borderWidth: 1,
      },
    ],
  });
  useEffect(() => {
    fetchData();

  }, [user, datesRange]);
  const fetchData = async () => {
    try {
      const res1 = await axios.get(
        "http://localhost:5000/api/fitnesses/getfitnesslogs",
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const res2 = await axios.get(
        "http://localhost:5000/api/nutritions/getnutritionlogs",
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setFitnessLogs(res1.data.data);
      setNutritionLogs(res2.data.data);
      setChartData({
            labels: datesRange.map((item)=>new Date(item).toISOString().split('T')[0]),
    datasets: [
      {
        label: "Calories burn",
        data: datesRange.map((date)=>{
          if(new Date(date).toISOString() == fitnessLogs.forEach((item)=>item.createdAt)) {
            
            return fitnessLogs.map((item)=>item.calories)
          }
          else{
            return 0
          }
        }),
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
        ],
        borderColor: "rgba(0, 0, 0, 1)",
        borderWidth: 1,
      },
      {
        label: "calories taken",
        data: [],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
        ],
        borderColor: "rgba(0, 0, 0, 1)",
        borderWidth: 1,
      },
    ],
      })
    } catch (error) {
      console.log(error);
    }
  };
  const handleLocate = () => {
    navigate("/personaldetails");
  };
  const handleChangeFitness = () => {
    navigate("/fitness");
  };
  const handleChangeNutrition = () => {
    navigate("/nutrition");
  };
  console.log(startDate)
  console.log(endDate)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (startDate && endDate) {
      const dates = [];
      let currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
        console.log(currentDate);
      }
      setDatesRange(dates);
      console.log(dates);
    } else {
      setDatesRange([]);
    }
  };
  console.log(datesRange);
  return (
    <>
      <div className="flex w-fit">
        <form onSubmit={handleSubmit} className="flex">
 <input
          type="date"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setStartDate(new Date(e.target.value))}
        />
        <input
          type="date"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setEndDate(new Date(e.target.value))}
        />
          <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          Load
        </button>
        </form>
       
      </div>
      <div className="w-3/4">
        <BarChart chartData={chartData} />
      </div>
      <div className="flex justify-around">
        <button
          type="button"
          onClick={handleLocate}
          className="p-2 bg-gray-600 rounded-lg cursor-pointer text-white"
        >
          My Fitness Info
        </button>
        <button
          type="button"
          onClick={handleChangeFitness}
          className=" flex p-2 bg-gray-600 rounded-lg cursor-pointer text-white"
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
        <button
          type="button"
          onClick={handleChangeNutrition}
          className=" flex p-2 bg-gray-600 rounded-lg cursor-pointer text-white"
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

          <p>Nutrition Log</p>
        </button>
      </div>
    </>
  );
};

export default Home;
