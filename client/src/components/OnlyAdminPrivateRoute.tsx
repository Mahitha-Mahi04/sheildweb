import { useUser } from "@/context/userContext";
import { Outlet, Navigate } from "react-router-dom";

export default function OnlyAdminPrivateRoute() {
  const { user } = useUser();

  return user && user.isAdmin ? <Outlet /> : <Navigate to={"/home"} />;
}
