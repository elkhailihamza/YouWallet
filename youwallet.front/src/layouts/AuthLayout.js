import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <Outlet />
    </div>
  );
};
