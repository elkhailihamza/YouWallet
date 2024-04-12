import { useAuth } from "../../contexts/AuthContext/AuthContext";

export const Home = () => {
  const { user } = useAuth();
  return (
    <div className="px-20 py-5">
      <div className="mt-10">
        <h1 className="text-2xl">
          Welcome, <span className="font-medium">{localStorage.getItem("USER")}</span>!
        </h1>
      </div>
    </div>
  );
};
