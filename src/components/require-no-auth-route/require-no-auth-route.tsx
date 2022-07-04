import React, {FC} from "react";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {TLocationState} from "../../services/types";
import {TRequireNoAuthRoute} from "../../services/types/components";

const RequireNoAuthRoute: FC<TRequireNoAuthRoute> = ({isAuth, redirectTo, redirectOnlyFrom}) => {
  const location = useLocation() as TLocationState
  const from = location.state ? location.state.from : '/'
  return isAuth || (from !== (redirectOnlyFrom || from)) ? <Navigate to={redirectTo} state={{ from: location.pathname }} replace /> : <Outlet />
}

export default RequireNoAuthRoute
