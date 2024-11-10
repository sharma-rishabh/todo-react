import React, { useState, useContext, createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const login = (newToken) => {
    setToken(newToken);
    window.localStorage.setItem("token", newToken);
  };

  const logout = () => {
    setToken(null);
    window.localStorage.removeItem("token");
  };

  const isAuthenticated = () => {
    const currToken = token || window.localStorage.getItem("token");
    setToken(currToken);
    return !!currToken;
  };
  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
