import React, {useContext} from "react";
import styles from './order-details.module.css'
import {statusCooking} from "../../utils/data";
import PropTypes from "prop-types";
import done from '../../images/done.gif'
import {OrderContext} from "../../services/order-context";

export default function OrderDetails(props) {
  const {popupHandler} = props
  const {orderState} = useContext(OrderContext)
  return (
    <article className={`${styles.container}`}>
      <h3 className={`text text_type_digits-large pt-10 ${styles.title}`}>{orderState.number}</h3>
      <h4 className="text text_type_main-medium pt-8 pb-15">идентификатор заказа</h4>
      <img className={`${styles.checkMark}`} onClick={() => popupHandler(false)} src={done} alt="OK" />
      {
        orderState.status.key === statusCooking.key &&
        <p className="text text_type_main-default pt-15 pb-2">{orderState.status.value}</p>
      }
      {
        orderState.status.key === statusCooking.key &&
        <p className="text text_type_main-default text_color_inactive pb-15">Дождитесь готовности на орбитальной станции</p>
      }
    </article>
  )
}

OrderDetails.propTypes = {
  popupHandler: PropTypes.func.isRequired,
}
