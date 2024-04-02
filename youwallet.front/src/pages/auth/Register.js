import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { SpinnerCircular } from "spinners-react";

export const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

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
    try {
      const response = await axios.post(
        "http://localhost:8000/api/register",
        data
      );
    } catch (error) {
      setErrors(error.response.data.errors);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-stone-50">
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
      <div className="border rounded-lg pb-10 w-96 shadow mb-24 bg-white">
        <div className="text-center p-10 pb-7">
          <h1 className="text-2xl">Register</h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className={`"flex flex-col px-10 ${loading ? "opacity-50" : ""}"`}
        >
          <div className="grid">
            <label className="my-1">Name</label>
            <input
              id="name"
              typeof="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              required
              disabled={loading}
              className="px-2 py-2.5 border focus:none"
              placeholder="Full name"
              type="text"
            />
            {errors.name && <span className="select-none bg-red-500 text-sm text-white p-1 mb-1">{errors.name}</span>}
          </div>
          <div className="grid">
            <label className="my-1">Email</label>
            <input
              id="email"
              typeof="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              required
              disabled={loading}
              className="px-2 py-2.5 border focus:none"
              placeholder="Email"
              autoComplete="username"
              type="email"
            />
            {errors.email && <span className="select-none bg-red-500 text-sm text-white p-1 mb-1">{errors.email}</span>}
          </div>
          <div className="grid">
            <label className="my-1">Password</label>
            <input
              id="password"
              typeof="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              required
              disabled={loading}
              className="px-2 py-2.5 border focus:none"
              placeholder="Password"
              autoComplete="current-password"
              type="password"
            />
            {errors.password && <span className="select-none bg-red-500 text-sm text-white p-1 mb-1">{errors.password}</span>}
          </div>
          <div className="mt-2">
            <span className="text-sm">
              Don't have an account?{" "}
              <Link to="/auth/login" className="text-blue-700 hover:underline">
                sign-up
              </Link>{" "}
              now!
            </span>
          </div>
          <div className="flex justify-center text-center text-white mt-5">
            {loading ? (
              <SpinnerCircular color="#000000" />
            ) : (
              <button
                type="submit"
                className="py-2.5 px-5 bg-blue-700 rounded-md shadow hover:underline"
              >
                Register
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
