import React from "react"
import styles from './app-header.module.css'
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import {useLocation} from "react-router-dom"
import AppHeaderNavLink from "../app-header-nav-link/app-header-nav-link"
import {APP_PATH} from "../../utils/constants"

export default function AppHeader() {
  const location = useLocation()
  const isConstructor = location.pathname === `${APP_PATH}${location.pathname.lastIndexOf("/") > 0 ? '/' : ''}`
  const isOrders = location.pathname === `${APP_PATH}/orders`
  const isProfile = location.pathname === `${APP_PATH}/profile`
  return (
    <header className={`${styles.header}`}>
      <nav className={`${styles.header__container}`}>
        <ul className={`${styles.header__navItems} pt-4 pb-4`}>
          <li className={styles.header__navItem}>
            <AppHeaderNavLink to={`${process.env.PUBLIC_URL}/`} active={isConstructor} text={'Конструктор'}>
              <BurgerIcon type={isConstructor ? "primary" : "secondary"} />
            </AppHeaderNavLink>
          </li>
          <li className={styles.header__navItem}>
            <AppHeaderNavLink to={`${process.env.PUBLIC_URL}/orders`} active={isOrders} text={'Лента заказов'}>
              <ListIcon type={isOrders ? "primary" : "secondary"} />
            </AppHeaderNavLink>
          </li>
        </ul>
        <Logo />
        <AppHeaderNavLink to={`${process.env.PUBLIC_URL}/profile`} active={isProfile} text={'Личный кабинет'} profile>
          <ProfileIcon type={isProfile ? "primary" : "secondary"} />
        </AppHeaderNavLink>
      </nav>
    </header>
  )
}
