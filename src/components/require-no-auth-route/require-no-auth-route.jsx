import React from "react";
import {Navigate, Outlet, useLocation} from "react-router-dom";

export default function RequireNoAuthRoute({isAuth, redirectTo, redirectOnlyFrom}) {
  const location = useLocation()
  const from = location.state ? location.state.from : '/'
  return isAuth || (from !== (redirectOnlyFrom || from)) ? <Navigate to={redirectTo} state={{ from: location.pathname }} replace /> : <Outlet />
}
