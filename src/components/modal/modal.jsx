import React, {useEffect} from "react";
import {createPortal} from "react-dom";
import styles from './modal.module.css';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";

export default function Modal(props) {
  const {title, onClose, children} = props;

  useEffect(() => {
    const handleEscKeydown = (event) => {
      event.key === "Escape" && onClose();
    }
    document.addEventListener('keydown', handleEscKeydown);
    return () => {
      document.removeEventListener('keydown', handleEscKeydown);
    };
  }, [onClose]);

  return createPortal(
    <>
      <section className={`${styles.section} pt-15 pr-10 pl-10 pb-15`}>
        <header className={styles.header}>
          {
            title &&
            <h2 className={`${styles.title} text text_type_main-large`}>{title}</h2>
          }
          <button onClick={onClose} className={styles.closeButton}>
            <CloseIcon type="primary" />
          </button>
        </header>
        {
          children
        }
      </section>
      <ModalOverlay popupHandler={onClose} />
    </>,
    document.querySelector('#modals')
  )
}

Modal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
