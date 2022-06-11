import React from "react"
import styles from './app-header.module.css'
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import {useLocation} from "react-router-dom"
import AppHeaderNavLink from "../app-header-nav-link/app-header-nav-link"

export default function AppHeader() {
  const location = useLocation()
  const isConstructor = location.pathname === `/`
  const isOrders = location.pathname.startsWith(`/feed`)
  const isProfile = location.pathname.startsWith(`/profile`)
  return (
    <header className={`${styles.header}`}>
      <nav className={`${styles.header__container}`}>
        <ul className={`${styles.header__navItems} pt-4 pb-4`}>
          <li className={styles.header__navItem}>
            <AppHeaderNavLink to={`/`} active={isConstructor} text={'Конструктор'}>
              <BurgerIcon type={isConstructor ? "primary" : "secondary"} />
            </AppHeaderNavLink>
          </li>
          <li className={styles.header__navItem}>
            <AppHeaderNavLink to={`/feed`} active={isOrders} text={'Лента заказов'}>
              <ListIcon type={isOrders ? "primary" : "secondary"} />
            </AppHeaderNavLink>
          </li>
        </ul>
        <Logo />
        <AppHeaderNavLink to={`/profile`} active={isProfile} text={'Личный кабинет'} profile>
          <ProfileIcon type={isProfile ? "primary" : "secondary"} />
        </AppHeaderNavLink>
      </nav>
    </header>
  )
}
