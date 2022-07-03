import React, {FC} from "react";
import styles from './modal-overlay.module.css'

const ModalOverlay: FC<{popupHandler: () => void}> = ({popupHandler}) => {
  return (
    <div onClick={popupHandler} className={styles.overlay} />
  )
}

export default ModalOverlay
