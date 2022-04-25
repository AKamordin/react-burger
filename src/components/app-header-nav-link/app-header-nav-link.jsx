import React from "react";
import {NavLink} from "react-router-dom";
import styles from './app-header-nav-link.module.css'
import PropTypes from "prop-types";

export default function AppHeaderNavLink(props) {
  const {to, text, active, profile} = props;
  return (
    <NavLink to={to} className={`${styles.header__link} pl-5 pr-5 pt-4 pb-4 ${profile && styles.header__profile}`}>
      {
        props.children
      }
      <span className={`text text_type_main-default ml-2 ${!active && 'text_color_inactive'}`}>{text}</span>
    </NavLink>
  )
}

AppHeaderNavLink.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  profile: PropTypes.bool,
}
