import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const NutritionLogs = () => {
  const { user } = useContext(UserContext);
  const [nutritionLogs, setNutritionLogs] = useState([]);
  const [newNutritionLog, setNewNutritionLog] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, [user]);
  const fetchData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/nutritions/getnutritionlogs",
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setNutritionLogs(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = async (id) => {
    document.getElementById("my_modal_1").showModal();
    try {
      const res = await axios.get(
        `http://localhost:5000/api/nutritions/getlog/${id}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setNewNutritionLog(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async (id, e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5000/api/nutritions/update/${id}`,
        newNutritionLog,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const updated = nutritionLogs.map((f) =>
        f._id === id ? res.data.data : f
      );
      setNutritionLogs(updated);
      setNewNutritionLog({
        food: "",
        carbohydrate: "",
        protein: "",
        fat: "",
        vitamin: "",
        minerals: "",
      });
      navigate("/nutritionlogs");
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/nutritions/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const filtered = nutritionLogs.filter((f) => f._id !== id);
      setNutritionLogs(filtered);
      toast.success("Log Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex grid-cols-4 gap-3">
      {nutritionLogs.map((logs, index) => {
        return (
          <div
            key={index}
            className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
          >
            <h1 className="text-xl font-bold">
              <span className="text-xl font-medium ">Food Name : </span>
              {logs.food}
            </h1>
            <h1 className="text-xl font-bold">
              <span className="text-xl font-medium ">Carbohydrate in g : </span>
              {logs.carbohydrate}
            </h1>
            <h1 className="text-xl font-bold">
              <span className="text-xl font-medium ">Protein in g : </span>
              {logs.protein}
            </h1>
            <h1 className="text-xl font-bold">
              <span className="text-xl font-medium ">Fat in g : </span>
              {logs.fat}
            </h1>
            <h1 className="text-xl font-bold">
              <span className="text-xl font-medium ">Vitamins : </span>
              {logs.vitamin}
            </h1>
            <h1 className="text-xl font-bold">
              <span className="text-xl font-medium ">Minerals : </span>
              {logs.minerals}
            </h1>
            <h1 className="text-xl font-bold">
              <span className="text-xl font-medium ">Calories Taken : </span>
              {logs.calories}
            </h1>
            <h1 className="text-xl font-bold">
              <span className="text-xl font-medium ">Date : </span>
              {logs.createdAt}
            </h1>
            <div className="flex justify-end gap-3">
              {/* Open the modal using document.getElementById('ID').showModal() method */}
              <button
                className="btn p-3 flex m-2 w-auto cursor-pointer text-white rounded-lg bg-blue-600"
                onClick={() => handleEdit(logs._id)}
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
              <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                  <div className="modal-action">
                    <form
                      method="dialog"
                      onSubmit={(e) => handleUpdate(newNutritionLog._id, e)}
                    >
                      {/* if there is a button in form, it will close the modal */}
                      <input
                        type="text"
                        placeholder="Enter food Name"
                        value={newNutritionLog.food}
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) =>
                          setNewNutritionLog({
                            ...newNutritionLog,
                            food: e.target.value,
                          })
                        }
                      />
                      <input
                        type="tel"
                        placeholder="Enter carbohydrate In g"
                        value={newNutritionLog.carbohydrate}
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) =>
                          setNewNutritionLog({
                            ...newNutritionLog,
                            carbohydrate: e.target.value,
                          })
                        }
                      />
                      <input
                        type="tel"
                        placeholder="Enter protein in g"
                        value={newNutritionLog.protein}
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) =>
                          setNewNutritionLog({
                            ...newNutritionLog,
                            protein: e.target.value,
                          })
                        }
                      />
                      <input
                        type="tel"
                        placeholder="Enter fat in g"
                        value={newNutritionLog.fat}
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) =>
                          setNewNutritionLog({
                            ...newNutritionLog,
                            fat: e.target.value,
                          })
                        }
                      />
                      <input
                        type="text"
                        placeholder="Enter vitamins Name"
                        value={newNutritionLog.vitamin}
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) =>
                          setNewNutritionLog({
                            ...newNutritionLog,
                            vitamin: e.target.value,
                          })
                        }
                      />
                      <input
                        type="text"
                        placeholder="Enter minerals Name"
                        value={newNutritionLog.minerals}
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) =>
                          setNewNutritionLog({
                            ...newNutritionLog,
                            minerals: e.target.value,
                          })
                        }
                      />
                      <button
                        className="btn"
                        type="submit"
                        onClick={() =>
                          document.getElementById("my_modal_1").close()
                        }
                      >
                        Update
                      </button>
                    </form>
                  </div>
                </div>
              </dialog>
              <button
                type="button"
                className="p-3 flex m-2 w-auto text-white cursor-pointer rounded-lg bg-red-600"
                onClick={() => handleDelete(logs._id)}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NutritionLogs;
