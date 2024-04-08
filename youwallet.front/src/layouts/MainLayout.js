import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext/AuthContext";
import { LOGIN } from "../App";
import { useEffect, useState } from "react";

export const MainLayout = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(LOGIN);
    } else {
      setLoading(false);
    }

    return () => {};
  }, [navigate]);
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
