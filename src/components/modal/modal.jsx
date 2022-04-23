import React, {useEffect} from "react";
import {createPortal} from "react-dom";
import styles from './modal.module.css';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";
import {unsetPopup} from "../../services/actions/popup";

export default function Modal(props) {
  const {title, onEscKeydown, children} = props;
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(unsetPopup())
  }

  useEffect(() => {
    document.addEventListener('keydown', onEscKeydown);
    return () => {
      document.removeEventListener('keydown', onEscKeydown);
    };
  }, [onEscKeydown]);

  return createPortal(
    <>
      <section className={`${styles.section} pt-15 pr-10 pl-10 pb-15`}>
        <header className={styles.header}>
          {
            title &&
            <h2 className={`${styles.title} text text_type_main-large`}>{title}</h2>
          }
          <button onClick={handleClose} className={styles.closeButton}>
            <CloseIcon type="primary" />
          </button>
        </header>
        {
          children
        }
      </section>
      <ModalOverlay popupHandler={handleClose} />
    </>,
    document.querySelector('#modals')
  )
}

Modal.propTypes = {
  title: PropTypes.string,
  onEscKeydown: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
