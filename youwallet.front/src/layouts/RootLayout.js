import { Outlet } from "react-router-dom";

export const RootLayout = () => {
  return (
    <div className="root-layout">
      <main>
        <Outlet />
      </main>
    </div>
  );
};
