import React from "react";
import styles from "./order-number-list.module.css";
import PropTypes from "prop-types";
import {orderType} from "../../utils/types";

export default function OrderNumberList(props) {
  const {title, orders, isDone} = props
  return (
    <div>
      <h3 className="mb-6 text text_type_main-medium" style={{whiteSpace: 'nowrap'}}>{title}</h3>
      <ul className={`${styles.numbers} ${isDone ? styles.done : ''}`}>
        {orders && orders.map(order =>
          <li key={order.number} className={`mb-2`}>
            <p className="text text_type_digits-default">{order.number}</p>
          </li>
        )}
      </ul>
    </div>
  )
}

OrderNumberList.propTypes = {
  title: PropTypes.string.isRequired,
  orders: PropTypes.arrayOf(orderType.isRequired).isRequired,
  isDone: PropTypes.bool
}
