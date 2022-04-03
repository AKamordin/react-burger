import React from 'react';
import styles from './app.module.css';
import ConstructorPage from "../pages/constructor-page/constructor-page";
import AppHeader from "../app-header/app-header";
import {Route, Routes} from "react-router-dom";
import OrdersPage from "../pages/orders-page/orders-page";
import ProfilePage from "../pages/profile-page/profile-page";

export default function App() {

  return (
    <div className={styles.app}>
      <div className={styles.content}>
        <AppHeader />
        <Routes>
          <Route path="/" element={<ConstructorPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </div>
  );
}
