import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const isAdmin = user?.role?.toLowerCase() === "admin";
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <nav className="bg-blue-600  shadow-md border-gray-800 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/home"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white dark:text-white">
            Fit2Go
          </span>
        </Link>
        <div className="dropdown sm:block md:hidden dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-5 w-5 stroke-current"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>{" "}
              </svg>
            </div>
          </div>
          {user ? (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link
                  to="/home"
                  className="  py-2 px-3 hover:bg-blue-600 hover:text-white"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/fitnesslogs"
                  className="py-2 px-3 hover:bg-blue-600 hover:text-white"
                >
                  Fitness logs
                </Link>
              </li>
              <li>
                <Link
                  to="/nutritionlogs"
                  className=" py-2 px-3 hover:bg-blue-600 hover:text-white"
                >
                  Nutrion Logs
                </Link>
              </li>
              <li>
                <Link
                  to="/goals"
                  className=" py-2 px-3 hover:bg-blue-600 hover:text-white "
                >
                  Goals
                </Link>
              </li>
              <button
                type="button"
                className="flex bg-red-500 justify-center cursor-pointer rounded-lg p-1 text-white "
                onClick={handleLogout}
              >
                <span>Logout</span>
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
                    d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
                  />
                </svg>
              </button>
            </ul>
          ) : (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/about" className=" py-2 px-3">
                  About
                </Link>
              </li>
              <li>
                <Link to="/register" className=" py-2 px-3 ">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/login" className="py-2 px-3 ">
                  Login
                </Link>
              </li>
            </ul>
          )}
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          {user ? (
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 bg-blue-600 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0  md:bg-blue-600 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/home"
                  className=" py-2 px-3 bg-blue-700 rounded-sm hover:text-white md:bg-transparent  md:p-0 md:dark:text-blue-500  dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/fitnesslogs"
                  className="block py-2 px-3 rounded-sm hover:text-white  md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Fitness logs
                </Link>
              </li>
              <li>
                <Link
                  to="/nutritionlogs"
                  className="block py-2 px-3  hover:text-white  md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Nutrion Logs
                </Link>
              </li>
              <li>
                <Link
                  to="/goals"
                  className="block py-2 px-3  hover:text-white  md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  aria-current="page"
                >
                  Goals
                </Link>
              </li>
              <button
                type="button"
                className="flex bg-red-500 cursor-pointer rounded-lg p-1 text-white "
                onClick={handleLogout}
              >
                <span>Logout</span>
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
                    d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
                  />
                </svg>
              </button>
            </ul>
          ) : (
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 bg-blue-600 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0   dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/about"
                  className="block py-2 px-3 hover:text-white  md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="block py-2 px-3  hover:text-white  md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="block py-2 px-3  text-white  md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Login
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
