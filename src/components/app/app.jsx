import React from 'react';
import styles from './app.module.css';
import ConstructorPage from "../../pages/constructor-page/constructor-page";
import AppHeader from "../app-header/app-header";
import {Route, Routes} from "react-router-dom";
import OrdersPage from "../../pages/orders-page/orders-page";
import ProfilePage from "../../pages/profile-page/profile-page";
import LoginPage from "../../pages/login-page/login-page";
import RegisterPage from "../../pages/register-page/register-page";
import NotFoundPage from "../../pages/not-found-page/not-found-page";
import ProtectedRoute from "../protected-route/protected-route";
import ForgotPasswordPage from "../../pages/forgot-password-page/forgot-password-page";
import ResetPasswordPage from "../../pages/reset-password-page/reset-password-page";
import IngredientPage from "../../pages/ingredient-page/ingredient-page";

export default function App() {

  return (
    <div className={styles.app}>
      <div className={styles.content}>
        <AppHeader />
        <Routes>
          <Route path={`/`} element={<ConstructorPage />} />
          <Route path={`register`} element={<RegisterPage />} />
          <Route path={`login`} element={<LoginPage />} />
          <Route path={`forgot-password`} element={<ForgotPasswordPage />} />
          <Route path={`reset-password`} element={<ResetPasswordPage />} />
          <Route path={`/orders`} element={<OrdersPage />} />
          <Route path={`/profile`} element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path={`/ingredients/:ingredientId`} element={<IngredientPage />} />
          <Route path={"*"} element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}
