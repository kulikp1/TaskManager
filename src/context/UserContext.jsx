/* eslint-disable react-refresh/only-export-components */
// src/context/UserContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const login = (userEmail) => {
    setEmail(userEmail);
    localStorage.setItem("email", userEmail);
  };

  const logout = () => {
    setEmail(null);
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  };

  return (
    <UserContext.Provider value={{ email, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
