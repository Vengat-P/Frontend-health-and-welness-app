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
  const [userData, setUserData] = useState({});
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
        backgroundColor: [],
        borderColor: "rgba(0, 0, 0, 1)",
        borderWidth: 1,
      },
      {
        label: "calories taken",
        data: [],
        backgroundColor: [],
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
      const res3 = await axios.get("http://localhost:5000/api/auth/getUser", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setUserData(res3.data.data);
      setFitnessLogs(res1.data.data);
      setNutritionLogs(res2.data.data);
      setChartData({
        labels: datesRange.map(
          (item) => new Date(item).toISOString().split("T")[0]
        ),
        datasets: [
          {
            label: "Calories burn(Your rest mode BMR + fitnesslog activities)",
            data: datesRange.map((date) => {
              const match = fitnessLogs.map((log) => {
                if (
                  log.createdAt.split("T")[0] ==
                  date.toISOString().split("T")[0]
                ) {
                  return log.calories;
                } else {
                  return 0;
                }
              });
              //calories burn through activities and rest mode calories burn general level
              return match.reduce((acc, sum) => acc + sum, 0) + userData.bmr;
            }),
            backgroundColor: ["rgba(255, 0, 0, 0.61)"],
            borderColor: "rgba(0, 0, 0, 1)",
            borderWidth: 1,
          },
          {
            label: "calories taken",
            data: datesRange.map((date) => {
              const match = nutritionLogs.map((log) => {
                if (
                  log.createdAt.split("T")[0] ==
                  date.toISOString().split("T")[0]
                ) {
                  return log.calories;
                } else {
                  return 0;
                }
              });
              console.log(match);
              return match.reduce((acc, sum) => acc + sum, 0);
            }),
            backgroundColor: ["rgba(0, 0, 245, 0.8)"],
            borderColor: "rgba(0, 0, 0, 1)",
            borderWidth: 1,
          },
        ],
      });
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
  // console.log(datesRange);
  return (
    <>
      <div className="sm:grid  md:flex justify-around  border-2 mt-3 p-4 mx-auto my-auto shadow-lg">
        <button
          type="button"
          onClick={handleLocate}
          className="p-2 bg-gray-600 rounded-lg cursor-pointer text-white"
        >
          Personal Info
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
        <button
          type="button"
          onClick={(e) => {
            navigate("/setgoal");
          }}
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

          <p>Set Goal</p>
        </button>
      </div>
      <div className="flex  justify-center mt-2 ">
        <form onSubmit={handleSubmit} className="sm:grid md:flex gap-2 justify-center">
          <input
            type="date"
            className="w-full p-3 mb-4 border cursor-pointer border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setStartDate(new Date(e.target.value))}
          />
          <input
            type="date"
            className="w-full p-3 mb-4 cursor-pointer border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setEndDate(new Date(e.target.value))}
          />
          <button
            type="submit"
            className="w-24 h-12 border cursor-pointer flex justify-center items-center bg-blue-600"
          >
            <svg
              className="w-6 h-6 text-white dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth={2}
                d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>
        </form>
      </div>
      <div className="sm:w-full  md:w-3/4  mx-auto ">
        <BarChart chartData={chartData} />
      </div>
    </>
  );
};

export default Home;
