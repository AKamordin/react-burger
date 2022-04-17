import React, {useEffect, useReducer, useState} from "react";
import api from "../../../api/api";
import styles from './constructor-page.module.css'
import pagesStyles from '../pages.module.css';
import BurgerIngredients from "../../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../burger-constructor/burger-constructor";
import Modal from "../../modal/modal";
import OrderDetails from "../../order-details/order-details";
import BurgerIngredientDetails from "../../burger-ingredient-details/burger-ingredient-details";
import ingredientsReducer, {ingredientsInitialState} from "../../../reducers/ingredients-reducer";
import orderReducer, {orderInitialState} from "../../../reducers/order-reducer";
import {DATA, ERROR, INGREDIENTS, INIT, LOADING, ORDER, SET} from "../../../utils/constants";
import {IngredientsContext} from "../../../services/ingredients-context";
import {SelectedIngredientContext} from "../../../services/selected-ingredient-context";
import {OrderContext} from "../../../services/order-context";


export default function ConstructorPage() {

  const [ingredientsState, ingredientsDispatcher] = useReducer(ingredientsReducer, ingredientsInitialState, undefined)
  const [orderState, orderDispatcher] = useReducer(orderReducer, orderInitialState, undefined)
  const [selectedIngredient, setSelectedIngredient] = useState(null)

  const [ingredientPopup, setIngredientPopup] = useState(false)
  const [orderDetailsPopup, setOrderDetailsPopup] = useState(false)


  const closeAllModals = () => {
    setOrderDetailsPopup(false)
    setIngredientPopup(false)
  }

  const handleEscKeydown = (event) => {
    event.key === "Escape" && closeAllModals();
  }

  useEffect( () => {
    if (api) {
      ingredientsDispatcher({type: SET + LOADING + INGREDIENTS});
      (async () => {
        await api.doAsyncGetRequest(
          'ingredients',
          (data) => {
            if (data.success) {
              ingredientsDispatcher({type: SET + DATA + INGREDIENTS, payload: data.data})
            } else {
              ingredientsDispatcher({type: SET + ERROR + INGREDIENTS, payload: 'Данные не получены'})
            }
          },
          (err) => {
            ingredientsDispatcher({type: SET + ERROR + INGREDIENTS, payload: err.message})
          }
        );
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    orderDispatcher({type: INIT + DATA + ORDER})
  }, [ingredientsState])

  return (
    <IngredientsContext.Provider value={{ingredientsState, ingredientsDispatcher}}>
      <SelectedIngredientContext.Provider value={{selectedIngredient, setSelectedIngredient}}>
        <OrderContext.Provider value={{orderState, orderDispatcher}}>
          {
            ingredientsState.data && ingredientsState.data.length > 0 && !orderState.error &&
            <main className={styles.constructor}>
              <BurgerIngredients popupHandler={setIngredientPopup} />
              <BurgerConstructor popupHandler={setOrderDetailsPopup}/>
            </main>
          }
          {
            ingredientsState.error &&
            <main className={pagesStyles.error}>
              <p className={`text text_type_main-medium text_color_inactive`}>{'Что-то пошло не так :('}</p>
              <p className={`text text_type_main-medium text_color_inactive`}>{ingredientsState.message}</p>
            </main>
          }
          {
            orderState.error &&
            <main className={pagesStyles.error}>
              <p className={`text text_type_main-medium text_color_inactive`}>{'Что-то пошло не так :('}</p>
              <p className={`text text_type_main-medium text_color_inactive`}>{orderState.message}</p>
            </main>
          }
          {
            orderDetailsPopup &&
              <Modal popupHandler={setOrderDetailsPopup} onEscKeydown={handleEscKeydown}>
                <OrderDetails popupHandler={setOrderDetailsPopup} />
              </Modal>
          }
          {
            ingredientPopup &&
            <Modal title={'Детали ингредиентов'} popupHandler={setIngredientPopup} onEscKeydown={handleEscKeydown}>
              <BurgerIngredientDetails ingredient={selectedIngredient} />
            </Modal>
          }
        </OrderContext.Provider>
      </SelectedIngredientContext.Provider>
    </IngredientsContext.Provider>
  )
}
