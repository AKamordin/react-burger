import React from "react";
import styles from "./orders-line.module.css";
import {Link, useLocation} from "react-router-dom";
import {orderType} from "../../utils/types";
import PropTypes from "prop-types";
import OrderItem from "../order-item/order-item";

export default function OrdersLine(props) {
  const {orders} = props
  const location = useLocation()

  return (
    <ul className={`${styles.orders} custom-scroll`}>
      {
        orders.map(order => {
          return (
            <li className="mr-2" key={order._id}>
              <Link className={styles.link} to={`/feed/${order._id}`} state={{background: location}}>
                <OrderItem order={order}/>
              </Link>
            </li>
          )
        })
      }
    </ul>
  )
}

OrdersLine.propTypes = {
  orders: PropTypes.arrayOf(orderType.isRequired).isRequired,
}
