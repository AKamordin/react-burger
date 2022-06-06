import React from "react";
import {Navigate, useLocation} from "react-router-dom";
import {isAuthSelector} from "../../services/selectors/auth";
import {useSelector} from "react-redux";
import {authAPI} from "../../services/api/auth";
import {Loader} from "../loader/loader";

export default function ProtectedRoute({children}) {
  const location = useLocation()
  const {isLoading: isUserLoading} = authAPI.useGetUserQuery()
  const isAuth = useSelector(isAuthSelector)

  if (isUserLoading) {
    return <Loader size="large" />
  }

  return isAuth ? children : <Navigate to="/login" state={{ from: location.pathname }} replace />
}
