import { Link } from "react-router-dom";

export const Login = () => {
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
      <div className="border rounded-lg h-96 w-96 shadow-md mb-10">
        <div className="text-center p-10 pb-7">
          <h1 className="text-2xl">Login</h1>
        </div>
        <form className="flex flex-col gap-2 px-10">
          <div className="grid gap-1">
            <label>Email</label>
            <input
              id="email"
              className="px-1 py-2.5 border focus:none"
              placeholder="Email"
              type="email"
            />
          </div>
          <div className="grid gap-1">
            <label>Password</label>
            <input
              id="password"
              className="px-1 py-2.5 border focus:none shadow-sm"
              placeholder="Password"
              type="password"
            />
          </div>
          <div>
            <span className="text-sm mt-2">
              Don't have an account?{" "}
              <Link to="/auth/register" className="text-blue-700 hover:underline">
                sign-up
              </Link>{" "}
              now!
            </span>
          </div>
          <div className="text-center text-white mt-3">
            <button
              type="submit"
              className="py-2.5 px-5 bg-blue-700 rounded-md shadow"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
