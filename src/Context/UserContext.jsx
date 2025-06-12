import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();
const UserProvider = ({ children }) => {
  //use usestate to get and store token and validations
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  //setting the user and removing the user from local storage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);
  //login user
  const login = (userData) => {
    //console.log("User Logged In:",userData)
    setUser(userData);
  };
  //logout user
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
