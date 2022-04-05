import React from "react";
import styles from './order-details.module.css'
import {statusCooking} from "../../utils/data";
import PropTypes from "prop-types";
import done from '../../images/done.gif'

export default function OrderDetails(props) {
  const {order, popupHandler} = props
  return (
    <article className={`${styles.container}`}>
      <h3 className={`text text_type_digits-large pt-10 ${styles.title}`}>{order.orderNumber}</h3>
      <h4 className="text text_type_main-medium pt-8 pb-15">идентификатор заказа</h4>
      <img className={`${styles.checkMark}`} onClick={() => popupHandler(false)} src={done} alt="OK" />
      {
        order.orderStatus.key === statusCooking.key &&
        <p className="text text_type_main-default pt-15 pb-2">{order.orderStatus.value}</p>
      }
      {
        order.orderStatus.key === statusCooking.key &&
        <p className="text text_type_main-default text_color_inactive pb-15">Дождитесь готовности на орбитальной станции</p>
      }
    </article>
  )
}

OrderDetails.propTypes = {
  order: PropTypes.shape({
    orderNumber: PropTypes.string.isRequired,
    orderStatus: PropTypes.shape({key: PropTypes.string.isRequired, value: PropTypes.string.isRequired,}).isRequired,
  }).isRequired,
  popupHandler: PropTypes.func.isRequired,
}
