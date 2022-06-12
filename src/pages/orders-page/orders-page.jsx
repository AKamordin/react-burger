import React from "react";
import pagesStyles from "../pages.module.css";
import styles from "./orders-page.module.css";
import {ordersAPI} from "../../services/api/orders";
import {Loader} from "../../components/loader/loader";
import {useSelector} from "react-redux";
import {
  doneOrdersSelector,
  ordersSelector,
  pendingOrdersSelector,
  totalOrderSelector,
  totalTodayOrderSelector
} from "../../services/selectors/orders";
import OrdersLine from "../../components/orders-line/orders-line";
import OrderNumberList from "../../components/order-number-list/order-number-list";
import {ingredientsAPI} from "../../services/api/ingredients";

export default function OrdersPage() {
  const {isLoading: isIngredientsLoading} =  ingredientsAPI.useGetIngredientsQuery();
  const {error, isLoading} = ordersAPI.useGetOrdersQuery()
  const orders = useSelector(ordersSelector)
  const pendingOrders = useSelector(pendingOrdersSelector)
  const doneOrders = useSelector(doneOrdersSelector)
  const total = useSelector(totalOrderSelector)
  const totalToday = useSelector(totalTodayOrderSelector)

  if (isLoading || isIngredientsLoading) {
    return <Loader size="large" />
  }

  if (error) {
    return (
      <section className={pagesStyles.error}>
        <p className={`text text_type_main-medium text_color_inactive`}>{'Что-то пошло не так :('}</p>
        <p className={`text text_type_main-medium text_color_inactive`}>{'Ошибка: ' + error.message}</p>
      </section>
    )
  }

  return (
    <section className={`${styles.section} p-10`}>
      <div>
        <h2 className="text text_type_main-large mb-5">Лента заказов</h2>
        <OrdersLine orders={orders} />
      </div>
      <div className={styles.info}>
        <div className={styles.orders}>
          <OrderNumberList title={`Готовы:`} orders={doneOrders} isDone />
          <OrderNumberList title={`В работе:`} orders={pendingOrders} />
        </div>
        <div>
          <h3 className="mt-15 text text_type_main-medium">Выполнено за все время:</h3>
          <p className={`text text_type_digits-large ${styles.total}`}>{total}</p>
        </div>
        <div>
          <h3 className="mt-15 text text_type_main-medium">Выполнено за сегодня:</h3>
          <p className={`text text_type_digits-large ${styles.total}`}>{totalToday}</p>
        </div>
      </div>
    </section>
  );
}
