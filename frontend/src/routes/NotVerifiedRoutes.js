import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Verification from "../pages/verification";

export default function NotVerifiedRoutes() {
  const { user } = useSelector((state) => ({ ...state }));
  return user?.verified ? <Outlet /> : <Verification />;
}
