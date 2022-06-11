import React from 'react';
import styles from './app.module.css';
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
import {useSelector} from "react-redux";
import {isAuthSelector} from "../../services/selectors/auth";
import {authAPI} from "../../services/api/auth";
import {Loader} from "../loader/loader";
import RequireNoAuthRoute from "../require-no-auth-route/require-no-auth-route";
import OrderPage from "../../pages/order-page/order-page";
import OrdersHistory from "../orders-history/orders-history";
import ProfileMain from "../profile-main/profile-main";

export default function App() {
  const {isLoading: isUserLoading} = authAPI.useGetUserQuery()
  const isAuth = useSelector(isAuthSelector)

  const location = useLocation()
  const background = location.state && location.state.background

  if (isUserLoading) {
    return <Loader size="large" />
  }

  return (
    <div className={styles.app}>
      <div className={styles.content}>
        <AppHeader />
        <Routes location={background || location}>
          <Route exact path={`/`} element={<ConstructorPage />} />
          <Route element={<RequireNoAuthRoute isAuth={isAuth} redirectTo={location.state ? location.state.from : '/'}/>}>
            <Route exact path={`/register`} element={<RegisterPage />} />
            <Route exact path={`/login`} element={<LoginPage />} />
            <Route exact path={`/forgot-password`} element={<ForgotPasswordPage />} />
          </Route>
          <Route element={<RequireNoAuthRoute isAuth={isAuth} redirectTo={`/login`} redirectOnlyFrom={`/forgot-password`}/>}>
            <Route exact path={`/reset-password`} element={<ResetPasswordPage />} />
          </Route>
          <Route exact path={`/feed`} element={<OrdersPage />} />
          <Route path={`/profile/orders/:orderId`} element={
            <RequireAuthRoute isAuth={isAuth} redirectTo={`/login`}>
              <OrderPage />
            </RequireAuthRoute>
          } />
          <Route path={`/profile/*`} element={
            <RequireAuthRoute isAuth={isAuth} redirectTo={`/login`}>
              <Routes>
                <Route path={`*`} element={<ProfilePage />}>
                  <Route index element={<ProfileMain />} />
                  <Route path={`orders`} element={<OrdersHistory />} />
                  <Route path={`orders/:orderId`} element={<OrderPage />} />
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
