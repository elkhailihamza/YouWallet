import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const check = () => {
    if (localStorage.getItem("ACCESS_TOKEN")) {
      setIsLoggedIn(true);
      return isLoggedIn;
    }
  };

  const stockAccess = (token, userInfo) => {
    if (token && userInfo) {
      localStorage.setItem("ACCESS_TOKEN", token);
      localStorage.setItem("USER", userInfo.name);
      setUser(userInfo);
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const value = {
    isLoggedIn,
    user,
    stockAccess,
    check,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
