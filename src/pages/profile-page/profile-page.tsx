import React, {FC} from "react";
import styles from "./profile-page.module.css";
import {NavLink, Outlet, useLocation, useNavigate} from "react-router-dom";
import {authAPI} from "../../services/api/auth";
import {refreshTokenSelector} from "../../services/selectors/auth";
import {TLocationState} from "../../services/types";
import {useAppSelector} from "../../hooks";

const ProfilePage: FC = () => {
  const location = useLocation() as TLocationState
  const isMainActive = location.pathname === '/profile'
  const isOrdersActive = location.pathname.startsWith('/profile/orders')
  const navigate = useNavigate()
  const refreshToken = useAppSelector(refreshTokenSelector)
  // eslint-disable-next-line
  const [logout, {}] = authAPI.useLogoutMutation()


  const handleLogout = async () => {
    const response = await logout(refreshToken as string)
    if ('data' in response && response.data.success) {
      navigate("/login", { replace: true })
    }
  }

  return (
    <section className={styles.container}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className="pt-6 pb-4">
            <NavLink to="" className={styles.link}>
              <p className={`text text_type_main-medium ${isMainActive ? styles.textColor : 'text_color_inactive'}`}>
                Профиль
              </p>
            </NavLink>
          </li>
          <li className="pt-6 pb-4">
            <NavLink to="orders" className={styles.link}>
              <p className={`text text_type_main-medium ${isOrdersActive ? styles.textColor : 'text_color_inactive'}`}>
                История заказов
              </p>
            </NavLink>
          </li>
          <li className="pt-6 pb-4">
            <p onClick={handleLogout} className={`${styles.quit} text text_type_main-medium text_color_inactive`}>
              Выход
            </p>
          </li>
        </ul>
        <p className={`text text_type_main-default text_color_inactive mt-20`}>
          В этом разделе вы можете &nbsp; изменить свои персональные данные
        </p>
      </nav>
      <div className="ml-15">
        <Outlet />
      </div>
    </section>
  )
}

export default ProfilePage
