import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Goal = () => {
  const { user } = useContext(UserContext);
  const [goals, setGoals] = useState([]);
  const [todayGoal, setTodayGoal] = useState([]);
  const [newGoalLog, setNewGoalLog] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, [user]);
  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://fit2go-app.onrender.com/api/goals/getallgoals",
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const res2 = await axios.get(
        "https://fit2go-app.onrender.com/api/autogoal/getallgoals",
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setLoading(false);
      setTodayGoal(res2.data.data);
      setGoals(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-spinner text-info"></span>
      </div>
    );
  }
  const handleEdit = async (id) => {
    document.getElementById("my_modal_1").showModal();
    try {
      const res = await axios.get(
        `https://fit2go-app.onrender.com/api/goals/getlog/${id}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const res2 = await axios.get(
        `https://fit2go-app.onrender.com/api/autogoal/getlog/${id}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setNewGoalLog(res.data.data || res2.data.data);
      console.log(newGoalLog);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleUpdate = async (id, e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `https://fit2go-app.onrender.com/api/goals/update/${id}`,
        newGoalLog,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const res2 = await axios.put(
        `https://fit2go-app.onrender.com/api/autogoal/update/${id}`,
        newGoalLog,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const updated = goals.map((f) => (f._id === id ? res.data.data : f));
      const updated2 = todayGoal.map((f) =>
        f._id === id ? res2.data.data : f
      );
      setTodayGoal(updated2);
      setGoals(updated);
      setNewGoalLog({ goal: "", status: "" });
      // navigate("/goals");
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `https://fit2go-app.onrender.com/api/goals/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const filtered = goals.filter((f) => f._id !== id);
      setGoals(filtered);
      toast.success("Log Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="sm:grid md:grid md:grid-cols-2 lg:grid lg:grid-cols-4 mt-3 mb-3 gap-3">
        {goals
          .map((logs, index) => {
            return (
              <div
                key={index}
                className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
              >
                <h1 className="text-xl font-bold">
                  <span className="text-xl font-medium ">Goal Name : </span>
                  {logs.goal}
                </h1>
                <h1 className="text-xl font-bold">
                  <span className="text-xl font-medium ">Status : </span>
                  {logs.status}
                </h1>
                <h1 className="text-xl font-bold">
                  <span className="text-xl font-medium ">From : </span>
                  {logs.from.split("T")[0]}
                </h1>
                <h1 className="text-xl font-bold">
                  <span className="text-xl font-medium ">To : </span>
                  {logs.to.split("T")[0]}
                </h1>
                <h1 className="text-xl font-bold">
                  <span className="text-xl font-medium ">Created At : </span>
                  {logs.createdAt.split("T")[0]}
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
                          onSubmit={(e) => handleUpdate(newGoalLog._id, e)}
                        >
                          {/* if there is a button in form, it will close the modal */}
                          <input
                            type="text"
                            placeholder="Enter Goal Name"
                            value={newGoalLog.goal}
                            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) =>
                              setNewGoalLog({
                                ...newGoalLog,
                                goal: e.target.value,
                              })
                            }
                          />
                          <select
                            onChange={(e) =>
                              setNewGoalLog({
                                ...newGoalLog,
                                status: e.target.value,
                              })
                            }
                            value={newGoalLog.status}
                            className="border p-2 mt-2 mb-4 rounded w-full"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                          </select>
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
                    className=" btn p-3 flex m-2 w-auto text-white cursor-pointer rounded-lg bg-red-600"
                    onClick={() => handleDelete(logs._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
          .reverse()}
      </div>
      <h1 className=" text-2xl font-semibold">Daily Goal</h1>
      <div className="sm:grid md:grid md:grid-cols-2 lg:grid lg:grid-cols-4 mt-3 mb-3 gap-3">
        {todayGoal
          .map((item, index) => {
            return (
              <div
                key={index}
                className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
              >
                <h1 className="text-xl font-bold">
                  <span className="text-xl font-medium ">Goal Name : </span>
                  {item.goal}
                </h1>
                <h1 className="text-xl font-bold">
                  <span className="text-xl font-medium ">Status : </span>
                  {item.status}
                </h1>
                <h1 className="text-xl font-bold">
                  <span className="text-xl font-medium ">Created At : </span>
                  {item.createdAt.split("T")[0]}
                </h1>
                <div className="flex justify-end gap-3">
                  {/* Open the modal using document.getElementById('ID').showModal() method */}
                  <button
                    className="btn p-3 flex m-2 w-auto cursor-pointer text-white rounded-lg bg-blue-600"
                    onClick={() => handleEdit(item._id)}
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
                    update
                  </button>
                  <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                      <div className="modal-action">
                        <form
                          method="dialog"
                          onSubmit={(e) => handleUpdate(newGoalLog._id, e)}
                        >
                          {/* if there is a button in form, it will close the modal */}
                          <input
                            type="text"
                            placeholder="Enter Goal Name"
                            value={newGoalLog.goal}
                            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) =>
                              setNewGoalLog({
                                ...newGoalLog,
                                goal: e.target.value,
                              })
                            }
                          />
                          <select
                            onChange={(e) =>
                              setNewGoalLog({
                                ...newGoalLog,
                                status: e.target.value,
                              })
                            }
                            value={newGoalLog.status}
                            className="border p-2 mt-2 mb-4 rounded w-full"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                          </select>
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
                </div>
              </div>
            );
          })
          .reverse()}
      </div>
    </>
  );
};

export default Goal;
