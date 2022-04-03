import React, {useEffect, useState} from "react";
import api from "../../../api/api";
import styles from './constructor-page.module.css'
import pagesStyles from '../pages.module.css';
import BurgerIngredients from "../../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../burger-constructor/burger-constructor";
import {currentOrder, order} from "../../../utils/data";
import Modal from "../../modal/modal";
import OrderDetails from "../../order-details/order-details";
import BurgerIngredientDetails from "../../burger-ingredient-details/burger-ingredient-details";


export default function ConstructorPage() {

  const initialState = {
    ingredients: [],
    loading: false,
    error: false,
    message: null,
  }

  const [state, setState] = useState(initialState);
  const [ingredientPopup, setIngredientPopup] = useState(false)
  const [selectedIngredient, setSelectedIngredient] = useState(null)
  const [orderDetailsPopup, setOrderDetailsPopup] = useState(false)

  const setLoading = () => {
    setState({
      ...state,
      loading: true,
    })
  }

  const setData = (data) => {
    setState({
      ...state,
      ingredients: data,
      error: false,
      loading: false,
      message: null,
    })
  }

  const setError = (message) => {
    setState({
      ...state,
      ingredients: [],
      error: true,
      loading: false,
      message: message,
    })
  }

  const closeAllModals = () => {
    setOrderDetailsPopup(false)
    setIngredientPopup(false)
  }

  const handleEscKeydown = (event) => {
    event.key === "Escape" && closeAllModals();
  }

  useEffect( () => {
    if (api) {
      setLoading(true);
      (async () => {
        await api.doAsyncGetRequest(
          'ingredients',
          (data) => {
            if (data.success) {
              setData(data.data)
            } else {
              setError()
            }
          },
          (err) => {
            setError(err.message)
          }
        );
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {
        state.ingredients && state.ingredients.length > 0 &&
        <main className={styles.constructor}>
          <BurgerIngredients ingredients={state.ingredients} selectIngredientHandler={setSelectedIngredient} popupHandler={setIngredientPopup} />
          <BurgerConstructor currentOrder={currentOrder} popupHandler={setOrderDetailsPopup}/>
        </main>
      }
      {
        state.error &&
        <main className={pagesStyles.error}>
          <p className={`text text_type_main-medium text_color_inactive`}>{'Что-то пошло не так :('}</p>
          <p className={`text text_type_main-medium text_color_inactive`}>{state.message}</p>
        </main>

      }
      {
        orderDetailsPopup &&
          <Modal popupHandler={setOrderDetailsPopup} onEscKeydown={handleEscKeydown}>
            <OrderDetails popupHandler={setOrderDetailsPopup} order={order} />
          </Modal>
      }
      {
        ingredientPopup &&
        <Modal title={'Детали ингредиентов'} popupHandler={setIngredientPopup} onEscKeydown={handleEscKeydown}>
          <BurgerIngredientDetails ingredient={selectedIngredient} />
        </Modal>
      }
    </>
  )
}
