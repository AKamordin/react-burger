import React from "react";
import styles from './order-details.module.css'
import {statusCooking} from "../../utils/data";
import done from '../../images/done.gif'
import {useDispatch, useSelector} from "react-redux";
import {unsetPopup} from "../../services/actions/popup";

export default function OrderDetails() {
  const dispatch = useDispatch();
  const order = useSelector(({order}) => order)
  const handleClose = () => {
    dispatch(unsetPopup())
  }

  return (
    <article className={`${styles.container}`}>
      <h3 className={`text text_type_digits-large pt-10 ${styles.title}`}>{order.number}</h3>
      <h4 className="text text_type_main-medium pt-8 pb-15">идентификатор заказа</h4>
      <img className={`${styles.checkMark}`} onClick={handleClose} src={done} alt="OK" />
      {
        order.status.key === statusCooking.key &&
        <p className="text text_type_main-default pt-15 pb-2">{order.status.value}</p>
      }
      {
        order.status.key === statusCooking.key &&
        <p className="text text_type_main-default text_color_inactive pb-15">Дождитесь готовности на орбитальной станции</p>
      }
    </article>
  )
}
