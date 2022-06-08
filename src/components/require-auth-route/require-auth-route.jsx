import React from "react";
import {Navigate, useLocation} from "react-router-dom";

export default function RequireAuthRoute({isAuth, redirectTo, children}) {
  const location = useLocation()
  return isAuth ? children : <Navigate to={redirectTo} state={{ from: location.pathname }} replace />
}
