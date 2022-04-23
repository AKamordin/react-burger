import React, {useCallback, useEffect} from "react";
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


export default function ConstructorPage() {
  const dispatch = useDispatch()
  const ingredients = useSelector(({ingredients}) => ingredients.ingredients)
  const selected = useSelector(({ingredients}) => ingredients.selected)
  const order = useSelector(({order}) => order)
  const popup = useSelector(({popup}) => popup)

  const handleEscKeydown = useCallback((event) => {
    event.key === "Escape" && dispatch(unsetPopup());
  }, [dispatch])

  useEffect( () => {
    dispatch(getIngredients());
  }, [dispatch])

  return (
    <>
      {
        ingredients.data && ingredients.data.length > 0 && !order.error &&
        <main className={styles.constructor}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
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
          <Modal onEscKeydown={handleEscKeydown}>
            <OrderDetails />
          </Modal>
      }
      {
        popup.show && popup.type === INGREDIENTS &&
        <Modal title={'Детали ингредиентов'} onEscKeydown={handleEscKeydown}>
          <BurgerIngredientDetails ingredient={selected} />
        </Modal>
      }
    </>
  )
}
