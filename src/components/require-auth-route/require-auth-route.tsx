import React, {FC} from "react";
import {Navigate, useLocation} from "react-router-dom";
import {TRequireAuthRoute} from "../../services/types/components";

const RequireAuthRoute: FC<TRequireAuthRoute> = ({isAuth, redirectTo, children}) => {
  const location = useLocation()
  return isAuth ? children : <Navigate to={redirectTo} state={{ from: location.pathname }} replace />
}

export default RequireAuthRoute
