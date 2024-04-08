import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext/AuthContext";
import { LOGIN } from "../App";
import { useEffect, useState } from "react";

export const MainLayout = () => {
  const navigate = useNavigate();
  const { isLoggedIn, check } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      await check();
      setLoading(false);
    };
    initialize();
  }, [check]);

  useEffect(() => {
    if (!loading) {
      if (!isLoggedIn) {
        navigate(LOGIN);
      }
    }
  }, [loading, isLoggedIn, navigate]);
  
  return (
    <div className="main-layout">
      {!loading && (
        <>
          <Navbar />
          <Outlet />
        </>
      )}
    </div>
  );
};
