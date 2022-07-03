import React, {FC} from "react";
import {NavLink} from "react-router-dom";
import styles from './app-header-nav-link.module.css'
import {TAppHeaderNavLink} from "../../services/types/components";

const AppHeaderNavLink: FC<TAppHeaderNavLink> = ({children, to, text, active, profile}) => {
  return (
    <NavLink to={to} className={`${styles.header__link} pl-5 pr-5 pt-4 pb-4 ${profile && styles.header__profile}`}>
      {
        children
      }
      <span className={`text text_type_main-default ml-2 ${!active && 'text_color_inactive'}`}>{text}</span>
    </NavLink>
  )
}

export default AppHeaderNavLink
