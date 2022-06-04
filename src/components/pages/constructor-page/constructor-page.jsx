import React from "react";
import {useDispatch, useSelector} from "react-redux";
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
import {unsetPopup} from "../../../services/slices/popup";
import {initBurger} from "../../../services/slices/burger";
import {initDataOrder} from "../../../services/slices/order";
import {ingredientsAPI} from "../../../services/api/ingredients";
import {
  errorIngredientsSelector,
  loadingIngredientsSelector,
  selectedIngredientSelector
} from "../../../services/selectors/ingredients";
import {errorOrderSelector, loadingOrderSelector} from "../../../services/selectors/order";
import {showPopupSelector, typePopupSelector} from "../../../services/selectors/popup";

export default function ConstructorPage() {
  const dispatch = useDispatch()
  const {data: ingredients} =  ingredientsAPI.useGetIngredientsQuery();
  const ingredientsError = useSelector(errorIngredientsSelector)
  const ingredientsLoading = useSelector(loadingIngredientsSelector)
  const selected = useSelector(selectedIngredientSelector)
  const orderError = useSelector(errorOrderSelector)
  const orderLoading = useSelector(loadingOrderSelector)
  const popupShow = useSelector(showPopupSelector)
  const popupType = useSelector(typePopupSelector)

  const handleIngredientPopupClose = () => {
    dispatch(unsetPopup())
  }

  const handleOrderPopupClose = () => {
    dispatch(unsetPopup())
    dispatch(initDataOrder())
    dispatch(initBurger())
  }

  if (ingredientsLoading) {
    return <Loader size="large" />
  }

  return (
    <>
      {
        ingredients?.data && ingredients?.data.length > 0 && !orderError &&
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
        ingredientsError &&
        <main className={pagesStyles.error}>
          <p className={`text text_type_main-medium text_color_inactive`}>{'Что-то пошло не так :('}</p>
          <p className={`text text_type_main-medium text_color_inactive`}>{ingredientsError}</p>
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
        popupShow && popupType === ORDER &&
          <Modal onClose={handleOrderPopupClose}>
            <OrderDetails onClose={handleOrderPopupClose} />
          </Modal>
      }
      {
        popupShow && popupType === INGREDIENTS &&
        <Modal title={'Детали ингредиентов'} onClose={handleIngredientPopupClose}>
          <BurgerIngredientDetails ingredient={selected} />
        </Modal>
      }
    </>
  )
}
