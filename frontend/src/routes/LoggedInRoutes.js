import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import Login from "../pages/login/login.js";
export default function LoggedInRoutes() {
  const { user } = useSelector((state) => ({ ...state }));
  return user ? <Outlet /> : <Login />;
}
