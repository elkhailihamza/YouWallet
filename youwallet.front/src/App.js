import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext/AuthContext";

import { RootLayout } from "./layouts/RootLayout";
import { MainLayout } from "./layouts/MainLayout";
import { AuthLayout } from "./layouts/AuthLayout";

import { Register } from "./pages/auth/Register";
import { Login } from "./pages/auth/Login";

import { Home } from "./pages/main/Home";
import { Transactions } from "./pages/main/Transactions";
import { Wallet } from "./pages/main/Wallet";
import { Settings } from "./pages/main/Settings";
import { Send } from "./pages/main/Send";

export const LOGIN = "/auth/login";
export const HOME = "/";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route index path="home" element={<Home />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="wallet" element={<Wallet />} />
        <Route path="send" element={<Send />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      {/* <Route path="*" element={<>} /> */}
    </Route>
  )
);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
