import React from "react";
import styles from './constructor-page.module.css'
import pagesStyles from '../pages.module.css';
import BurgerIngredients from "../../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../burger-constructor/burger-constructor";
import Modal from "../../modal/modal";
import OrderDetails from "../../order-details/order-details";
import BurgerIngredientDetails from "../../burger-ingredient-details/burger-ingredient-details";
import {INGREDIENTS, ORDER} from "../../../utils/constants";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {Loader} from "../../loader/loader";
import {observer} from "mobx-react";
import useStore from "../../../hooks/useStore";

function ConstructorPage() {
  const {ingredientsStore, popupStore, orderStore, burgerStore} = useStore()
  const {data, error, selected, loading} = ingredientsStore
  const {show, type} = popupStore
  const {error: orderError, loading: orderLoading} = orderStore

  const handleIngredientPopupClose = () => {
    popupStore.unsetPopup()
  }

  const handleOrderPopupClose = () => {
    popupStore.unsetPopup()
    orderStore.initOrder()
    burgerStore.initBurger()
  }

  if (loading) {
    return <Loader size="large" />
  }

  return (
    <>
      {
        data && data.length > 0 && !orderError &&
        <main className={styles.constructor}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            {
              orderLoading ? (
              <Loader size="large" />
              ) : (
                <BurgerConstructor />
              )
            }
          </DndProvider>
        </main>
      }
      {
        error &&
        <main className={pagesStyles.error}>
          <p className={`text text_type_main-medium text_color_inactive`}>{'Что-то пошло не так :('}</p>
          <p className={`text text_type_main-medium text_color_inactive`}>{error}</p>
        </main>
      }
      {
        orderError &&
        <main className={pagesStyles.error}>
          <p className={`text text_type_main-medium text_color_inactive`}>{'Что-то пошло не так :('}</p>
          <p className={`text text_type_main-medium text_color_inactive`}>{orderError}</p>
        </main>
      }
      {
        show && type === ORDER &&
          <Modal onClose={handleOrderPopupClose}>
            <OrderDetails onClose={handleOrderPopupClose} />
          </Modal>
      }
      {
        show && type === INGREDIENTS &&
        <Modal title={'Детали ингредиентов'} onClose={handleIngredientPopupClose}>
          <BurgerIngredientDetails ingredient={selected} />
        </Modal>
      }
    </>
  )
}

export default observer(ConstructorPage)
