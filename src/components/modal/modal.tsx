import React, {FC, useEffect} from "react";
import {createPortal} from "react-dom";
import styles from './modal.module.css';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from "../modal-overlay/modal-overlay";

const Modal: FC<{ title?: string, isOrder?: boolean, onClose: () => void}> = ({title, isOrder, onClose, children}) => {

  const root: HTMLElement = document.querySelector('#modals') as HTMLElement

  useEffect(() => {
    const handleEscKeydown = (event: {key: string}) => {
      event.key === "Escape" && onClose()
    }
    document.addEventListener('keydown', handleEscKeydown)
    return () => {
      document.removeEventListener('keydown', handleEscKeydown)
    };
  }, [onClose])

  return createPortal(
    <>
      <section className={`${styles.section} pt-15 pr-10 pl-10 pb-15`}>
        <header className={styles.header}>
          {
            title &&
            <h2 className={`${styles.title} text ${isOrder ? 'text_type_main-medium' : 'text_type_main-large'}`}>{title}</h2>
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
    root
  )
}

export default Modal
