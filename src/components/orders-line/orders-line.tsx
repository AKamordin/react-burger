import React, {FC} from "react";
import styles from "./orders-line.module.css";
import {Link, useLocation} from "react-router-dom";
import OrderItem from "../order-item/order-item";
import {TOrderList} from "../../services/types/components";
import {TLocationState} from "../../services/types";

const OrdersLine: FC<TOrderList> = ({orders}) => {
  const location = useLocation() as TLocationState

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

export default OrdersLine
