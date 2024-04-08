import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const stockAccess = (token) => {
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
      setIsLoggedIn(true);
      return true;
    }
    return false; 
  };

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
    stockAccess,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
