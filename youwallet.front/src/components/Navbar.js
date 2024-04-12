import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext/AuthContext";

export const Navbar = () => {
  return (
    <nav className="py-5 md:px-20 px-5 select-none shadow">
      <div className="w-full flex justify-between">
        <div className="flex gap-2 items-center">
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
        <ul className="flex flex-wrap items-center md:gap-5 font-medium">
          <li>
            <NavLink to="/" className="inline-block hover:underline">
              Home
            </NavLink>
          </li>
          <div className="md:block hidden">
            <div className="flex gap-5">
              <li>
                <NavLink to="/transactions" className="hover:underline">
                  Transactions
                </NavLink>
              </li>
              <li>
                <NavLink to="/wallet" className="hover:underline">
                  Wallet
                </NavLink>
              </li>
              <li>
                <NavLink to="/send" className="hover:underline">
                  Send
                </NavLink>
              </li>
            </div>
          </div>
          <li>
            <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="text-white hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-blue-300 font-medium text-sm px-2.5 py-2.5 text-center inline-flex items-center"
              type="button"
            >
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
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <div
              id="dropdown"
              className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 me-20 top-10"
            >
              <ul
                className="py-2 text-sm text-gray-700"
                aria-labelledby="dropdownDefaultButton"
              >
                <div className="md:hidden block">
                  <li>
                    <NavLink
                      to="/transactions"
                      className="hover:underline block px-4 py-2 hover:bg-gray-100"
                    >
                      Transactions
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/wallet"
                      className="hover:underline block px-4 py-2 hover:bg-gray-100"
                    >
                      Wallet
                    </NavLink>
                  </li>
                </div>
                <li>
                  <NavLink
                    to="/settings"
                    className="hover:underline block px-4 py-2 hover:bg-gray-100"
                  >
                    Settings
                  </NavLink>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};
