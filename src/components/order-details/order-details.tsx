import React, {FC} from "react";
import styles from './order-details.module.css'
import done from '../../images/done.gif'
import {statusCreated} from "../../utils/constants";
import {numberOrderSelector, statusOrderSelector} from "../../services/selectors/order";
import {useAppSelector} from "../../hooks";

const OrderDetails: FC<{onClose: () => void}> = ({onClose}) => {
  const status = useAppSelector(statusOrderSelector)
  const number = useAppSelector(numberOrderSelector)

  return (
    <article className={`${styles.container}`}>
      <h3 className={`text text_type_digits-large pt-10 ${styles.title}`}>{number}</h3>
      <h4 className="text text_type_main-medium pt-8 pb-15">идентификатор заказа</h4>
      <img className={`${styles.checkMark}`} onClick={onClose} src={done} alt="OK" />
      {
        status.key === statusCreated.key &&
        <p className="text text_type_main-default pt-15 pb-2">{status.value}</p>
      }
      {
        status.key === statusCreated.key &&
        <p className="text text_type_main-default text_color_inactive pb-15">Дождитесь готовности на орбитальной станции</p>
      }
    </article>
  )
}

export default OrderDetails
