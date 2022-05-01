import React, {useEffect} from "react";
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
import {modelPopup} from "../../../models/popup";
import {useStore} from "effector-react";
import {modelIngredients} from "../../../models/ingredients";
import {modelOrder} from "../../../models/order";
import {modelBurger} from "../../../models/burger";


export default function ConstructorPage() {
  const ingredients = useStore(modelIngredients.$data)
  const selected = useStore(modelIngredients.$selected)
  const error = useStore(modelIngredients.$error)
  const orderError = useStore(modelOrder.$error)
  const orderLoading = useStore(modelOrder.$loading)
  const showPopup = useStore(modelPopup.$show)
  const popupType = useStore(modelPopup.$type)

  const handleIngredientPopupClose = () => {
    modelPopup.unsetPopup()
  }

  const handleOrderPopupClose = () => {
    modelPopup.unsetPopup()
    modelOrder.initDataOrder()
    modelBurger.initBurger()
  }

  useEffect( () => {
    modelIngredients.loadIngredients()
  }, [])

  return (
    <>
      {
        ingredients && ingredients.length > 0 && !orderError &&
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
        showPopup && popupType === ORDER &&
          <Modal onClose={handleOrderPopupClose}>
            <OrderDetails onClose={handleOrderPopupClose} />
          </Modal>
      }
      {
        showPopup && popupType === INGREDIENTS &&
        <Modal title={'Детали ингредиентов'} onClose={handleIngredientPopupClose}>
          <BurgerIngredientDetails ingredient={selected} />
        </Modal>
      }
    </>
  )
}
