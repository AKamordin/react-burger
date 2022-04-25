import React from "react";
import styles from './modal-overlay.module.css'
import PropTypes from "prop-types";

export default function ModalOverlay(props) {
  const {popupHandler} = props
  return (
    <div onClick={popupHandler} className={styles.overlay} />
  )
}

ModalOverlay.propTypes = {
  popupHandler: PropTypes.func.isRequired,
};
