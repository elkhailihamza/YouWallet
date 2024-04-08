import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SpinnerCircular } from "spinners-react";
import { useAuth } from "../../contexts/AuthContext/AuthContext";
import { HOME } from "../../App";
import axiosClient from "../../axios";

export const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [errorWrong, setErrorWrong] = useState([]);
  const { stockAccess } = useAuth();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);
    setErrorWrong([]);
    try {
      const response = await axiosClient.post("/login", data);
      if (stockAccess(response.data.access_token)) {
        navigate(HOME);
      }
    } catch (error) {
      setErrors(error.response.data.errors);
      setErrorWrong(error.response.data.error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="flex gap-2 items-center justify-center p-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
        </svg>
        <h1 className="text-2xl font-medium">YouWallet</h1>
      </div>
      <div className="border rounded-lg pb-10 w-96 shadow-md mb-10">
        <div className="text-center p-10 pb-7">
          <h1 className="text-2xl">Login</h1>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 px-10">
          <div className="grid">
            <label className="my-1">Email</label>
            <input
              id="email"
              name="email"
              value={data.email}
              className="px-1 py-2.5 border focus:none"
              autoComplete="username"
              placeholder="Email"
              disabled={loading}
              onChange={handleChange}
              type="email"
            />
            {errors && errors.email && (
              <span className="select-none bg-red-500 text-sm text-white p-1 mb-1">
                {errors.email}
              </span>
            )}
          </div>
          <div className="grid">
            <label className="my-1">Password</label>
            <input
              id="password"
              name="password"
              value={data.password}
              className="px-1 py-2.5 border focus:none shadow-sm"
              autoComplete="current-password"
              placeholder="Password"
              disabled={loading}
              onChange={handleChange}
              type="password"
            />
            {errors && errors.password && (
              <span className="select-none bg-red-500 text-sm text-white p-1 mb-1">
                {errors.password}
              </span>
            )}
          </div>
          {errorWrong && errorWrong.length > 0 && (
            <span className="select-none bg-red-500 text-sm text-white p-1">
              {errorWrong}
            </span>
          )}
          <div>
            <span className="text-sm mt-2">
              Don't have an account?{" "}
              <Link
                to="/auth/register"
                className="text-blue-700 hover:underline"
              >
                sign-up
              </Link>{" "}
              now!
            </span>
          </div>
          <div className="flex justify-center text-center text-white mt-3">
            {loading ? (
              <SpinnerCircular color="#000000" />
            ) : (
              <button
                type="submit"
                className="py-2.5 px-5 bg-blue-700 hover:bg-blue-800 transition-all rounded-md shadow"
              >
                Login
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
