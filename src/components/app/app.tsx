import React, {FC} from 'react';
import styles from "./app.module.css";
import ConstructorPage from "../../pages/constructor-page/constructor-page";
import AppHeader from "../app-header/app-header";
import {Route, Routes, useLocation} from "react-router-dom";
import OrdersPage from "../../pages/orders-page/orders-page";
import ProfilePage from "../../pages/profile-page/profile-page";
import LoginPage from "../../pages/login-page/login-page";
import RegisterPage from "../../pages/register-page/register-page";
import NotFoundPage from "../../pages/not-found-page/not-found-page";
import RequireAuthRoute from "../require-auth-route/require-auth-route";
import ForgotPasswordPage from "../../pages/forgot-password-page/forgot-password-page";
import ResetPasswordPage from "../../pages/reset-password-page/reset-password-page";
import IngredientPage from "../../pages/ingredient-page/ingredient-page";
import {isAuthSelector} from "../../services/selectors/auth";
import {authAPI} from "../../services/api/auth";
import {Loader} from "../loader/loader";
import RequireNoAuthRoute from "../require-no-auth-route/require-no-auth-route";
import OrderPage from "../../pages/order-page/order-page";
import ProfileMain from "../profile-main/profile-main";
import {TLocationState} from "../../services/types";
import {useAppSelector} from "../../hooks";
import OrdersHistory from "../orders-history/orders-history";

const App: FC = () => {
  const {isLoading: isUserLoading} = authAPI.useGetUserQuery()
  const isAuth = useAppSelector(isAuthSelector)

  const location = useLocation() as TLocationState
  const background = location.state && location.state.background

  if (isUserLoading) {
    return <Loader size="large" />
  }

  return (
    <div className={styles.app}>
      <div className={styles.content}>
        <AppHeader />
        <Routes location={background || location}>
          <Route path={`/`} element={<ConstructorPage />} />
          <Route element={<RequireNoAuthRoute isAuth={isAuth} redirectTo={location.state ? location.state.from : '/'}/>}>
            <Route path={`/register`} element={<RegisterPage />} />
            <Route path={`/login`} element={<LoginPage />} />
            <Route path={`/forgot-password`} element={<ForgotPasswordPage />} />
          </Route>
          <Route element={<RequireNoAuthRoute isAuth={isAuth} redirectTo={`/login`} redirectOnlyFrom={`/forgot-password`}/>}>
            <Route path={`/reset-password`} element={<ResetPasswordPage />} />
          </Route>
          <Route path={`/feed`} element={<OrdersPage />} />
          <Route path={`/profile/orders/:orderId`} element={
            <RequireAuthRoute isAuth={isAuth} redirectTo={`/login`}>
              <OrderPage isHistory />
            </RequireAuthRoute>
          } />
          <Route path={`/profile/*`} element={
            <RequireAuthRoute isAuth={isAuth} redirectTo={`/login`}>
              <Routes>
                <Route path={`*`} element={<ProfilePage />}>
                  <Route index element={<ProfileMain />} />
                  <Route path={`orders`} element={<OrdersHistory />} />
                  <Route path={`orders/:orderId`} element={<OrderPage isHistory />} />
                </Route>
              </Routes>
            </RequireAuthRoute>
          } />
          <Route path={`/ingredients/:ingredientId`} element={<IngredientPage />} />
          <Route path={`/feed/:orderId`} element={<OrderPage />} />
          <Route path={"*"} element={<NotFoundPage />} />
        </Routes>
        {
          background &&
          <Routes>
            <Route path={`/ingredients/:ingredientId`} element={<IngredientPage />} />
            <Route path={`/feed/:orderId`} element={<OrderPage />} />
          </Routes>
        }
      </div>
    </div>
  );
}

export default App
