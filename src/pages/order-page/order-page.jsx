import React from "react";
import {ingredientsAPI} from "../../services/api/ingredients";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {ordersAPI} from "../../services/api/orders";
import {Loader} from "../../components/loader/loader";
import {useSelector} from "react-redux";
import {ordersSelector} from "../../services/selectors/orders";
import Modal from "../../components/modal/modal";
import styles from "../ingredient-page/ingredient-page.module.css";
import OrderInfo from "../../components/order-info/order-info";

export default function OrderPage() {
  const {isLoading: isIngredientsLoading} = ingredientsAPI.useGetIngredientsQuery()
  const {isLoading: isOrdersLoading} = ordersAPI.useGetOrdersQuery()
  const orders = useSelector(ordersSelector)
  const {orderId} = useParams()
  const order = orders ? orders.find(i => i._id === orderId) : null
  const navigate = useNavigate()
  const location = useLocation()
  const background = location.state && location.state.background

  const handleOrderPopupClose = () => {
    navigate(-1)
  }

  if (!order) {
    return null
  }

  if (isOrdersLoading || isIngredientsLoading) {
    return <Loader size="large" />
  }

  return (
    <>
      {background ? (
        <Modal title={`#${order.number}`} isOrder onClose={handleOrderPopupClose}>
          <OrderInfo order={order} />
        </Modal>
      ) : (
        <section className={styles.page}>
          <h2 className="text text_type_main-medium">#{order.number}</h2>
          <OrderInfo order={order} />
        </section>
      )}
    </>
  )
}
