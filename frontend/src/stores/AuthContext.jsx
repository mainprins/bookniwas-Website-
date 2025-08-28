import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('auth') === 'true';
  });

  const [authUser,setAuthUser] = useState();

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated,authUser,setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

