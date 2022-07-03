import React, {FC} from "react";
import pagesStyles from "../pages.module.css";
import styles from "./orders-page.module.css";
import {ordersAPI} from "../../services/api/orders";
import {Loader} from "../../components/loader/loader";
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
import {useAppSelector} from "../../hooks";

const OrdersPage: FC = () => {
  const {isLoading: isIngredientsLoading} =  ingredientsAPI.useGetIngredientsQuery();
  const {error, isLoading} = ordersAPI.useGetOrdersQuery()
  const orders = useAppSelector(ordersSelector)
  const pendingOrders = useAppSelector(pendingOrdersSelector)
  const doneOrders = useAppSelector(doneOrdersSelector)
  const total = useAppSelector(totalOrderSelector)
  const totalToday = useAppSelector(totalTodayOrderSelector)

  if (isLoading || isIngredientsLoading) {
    return <Loader size="large" />
  }

  if (error) {
    return (
      <section className={pagesStyles.error}>
        <p className={`text text_type_main-medium text_color_inactive`}>{'Что-то пошло не так :('}</p>
        <p className={`text text_type_main-medium text_color_inactive`}>{'Ошибка: ' + (error as Error).message}</p>
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

export default OrdersPage
