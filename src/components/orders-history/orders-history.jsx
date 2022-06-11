import React from "react";
import styles from "./orders-history.module.css";
import {Link, useLocation} from "react-router-dom";
import OrderItem from "../order-item/order-item";
import {ingredientsAPI} from "../../services/api/ingredients";
import {useSelector} from "react-redux";
import {Loader} from "../loader/loader";
import {historyAPI} from "../../services/api/history";
import {historyOrdersSelector} from "../../services/selectors/history";

export default function OrdersHistory() {
  const location = useLocation()
  const {isLoading: isIngredientsLoading} = ingredientsAPI.useGetIngredientsQuery()
  const {isLoading: isOrdersLoading} = historyAPI.useGetOrdersQuery()
  const orders = useSelector(historyOrdersSelector)
  if (!orders) {
    return null
  }

  const sortedOrders = orders.slice().sort((a, b) => b.number - a.number)

  if (isOrdersLoading || isIngredientsLoading) {
    return <Loader size="large" />
  }

  return (
    <ul className={`${styles.history} custom-scroll`}>
      {
        sortedOrders.map(order => {
        return (
          <li className="mr-2" key={order._id}>
            <Link className={styles.link} to={`${location.pathname}/${order._id}`} state={{background: location}}>
              <OrderItem order={order} isHistory />
            </Link>
          </li>)
      })}
    </ul>
  )
}
