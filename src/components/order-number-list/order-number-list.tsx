import React, {FC} from "react";
import styles from "./order-number-list.module.css";
import {TOrderNumberList} from "../../services/types/components";

const OrderNumberList: FC<TOrderNumberList> = ({title, orders, isDone}) => {
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

export default OrderNumberList
