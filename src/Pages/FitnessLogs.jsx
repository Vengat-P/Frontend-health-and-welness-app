import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const FitnessLogs = () => {
  const { user } = useContext(UserContext);
  const [fitnessLogs, setFitnessLogs] = useState([]);
  const[status,setStatus] = useState(true)
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, [user]);
  const fetchData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/fitnesses/getfitnesslogs",
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setFitnessLogs(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = ()=>{
    
  }
  const handleDelete = async(id)=>{
try {
      const res = await axios.delete(`http://localhost:5000/api/fitnesses/delete/${id}`,{
          headers: { Authorization: `Bearer ${user.token}` },
        }) 
        const filtered = fitnessLogs.filter((f)=>f._id !== id)
        setFitnessLogs(filtered)
        toast.success("Log Deleted Successfully") 
    } catch (error) {
        console.log(error)
    }
  }
  return (
    <div className="flex grid-cols-4 gap-3">
      {fitnessLogs.map((logs, index) => {
        return (
          <div
            key={index}
            className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
          >
            <h1 className="text-xl font-bold">
              <span className="text-xl font-medium ">Exercise Name : </span>
              {logs.exercises}
            </h1>
            <h1 className="text-xl font-bold">
              <span className="text-xl font-medium ">Duration : </span>
              {logs.duration}
            </h1>
            <h1 className="text-xl font-bold">
              <span className="text-xl font-medium ">Calories Burn : </span>
              {logs.calories}
            </h1>
            <h1 className="text-xl font-bold">
              <span className="text-xl font-medium ">Date : </span>
              {logs.createdAt}
            </h1>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={handleEdit}
                className="p-3 flex m-2 w-auto cursor-pointer text-white rounded-lg bg-blue-600"
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
                Edit
              </button>
              <button type="button"className="p-3 flex m-2 w-auto text-white cursor-pointer rounded-lg bg-red-600" onClick={()=>handleDelete(logs._id)}>Delete</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FitnessLogs;
