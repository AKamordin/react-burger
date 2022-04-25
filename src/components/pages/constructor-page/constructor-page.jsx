import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import styles from './constructor-page.module.css'
import pagesStyles from '../pages.module.css';
import BurgerIngredients from "../../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../burger-constructor/burger-constructor";
import Modal from "../../modal/modal";
import OrderDetails from "../../order-details/order-details";
import BurgerIngredientDetails from "../../burger-ingredient-details/burger-ingredient-details";
import {getIngredients} from "../../../services/actions/ingredients";
import {unsetPopup} from "../../../services/actions/popup";
import {INGREDIENTS, ORDER} from "../../../utils/constants";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {Loader} from "../../loader/loader";
import {initDataOrder} from "../../../services/actions/order";
import {initBurger} from "../../../services/actions/burger";


export default function ConstructorPage() {
  const dispatch = useDispatch()
  const ingredients = useSelector(({ingredients}) => ingredients.ingredients)
  const selected = useSelector(({ingredients}) => ingredients.selected)
  const order = useSelector(({order}) => order)
  const popup = useSelector(({popup}) => popup)

  const handleIngredientPopupClose = () => {
    dispatch(unsetPopup())
  }

  const handleOrderPopupClose = () => {
    dispatch(unsetPopup())
    dispatch(initDataOrder())
    dispatch(initBurger())
  }

  useEffect( () => {
    dispatch(getIngredients())
  }, [dispatch])

  return (
    <>
      {
        ingredients.data && ingredients.data.length > 0 && !order.error &&
        <main className={styles.constructor}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            {
              order.loading ? (
              <Loader size="large" />
              ) : (
                <BurgerConstructor />
              )
            }
          </DndProvider>
        </main>
      }
      {
        ingredients.error &&
        <main className={pagesStyles.error}>
          <p className={`text text_type_main-medium text_color_inactive`}>{'Что-то пошло не так :('}</p>
          <p className={`text text_type_main-medium text_color_inactive`}>{ingredients.message}</p>
        </main>
      }
      {
        order.error &&
        <main className={pagesStyles.error}>
          <p className={`text text_type_main-medium text_color_inactive`}>{'Что-то пошло не так :('}</p>
          <p className={`text text_type_main-medium text_color_inactive`}>{order.message}</p>
        </main>
      }
      {
        popup.show && popup.type === ORDER &&
          <Modal onClose={handleOrderPopupClose}>
            <OrderDetails onClose={handleOrderPopupClose} />
          </Modal>
      }
      {
        popup.show && popup.type === INGREDIENTS &&
        <Modal title={'Детали ингредиентов'} onClose={handleIngredientPopupClose}>
          <BurgerIngredientDetails ingredient={selected} />
        </Modal>
      }
    </>
  )
}
