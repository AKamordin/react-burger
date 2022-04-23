import {DATA, ERROR, INGREDIENTS, LOADING, SELECTED, SET} from "../../utils/constants";
import api from "../../api/api";
import {initBurger} from "./burger";

export const setLoadingIngredients = () => (
  {
    type: SET + LOADING + INGREDIENTS,
  }
)

export const setDataIngredients = (value) => (
  {
    type: SET + DATA + INGREDIENTS,
    payload: value
  }
)

export const setErrorIngredients = (value) => (
  {
    type: SET + ERROR + INGREDIENTS,
    payload: value
  }
)

export const setSelectedIngredients = (value) => (
  {
    type: SET + SELECTED + INGREDIENTS,
    payload: value
  }
)

export const getIngredients = () => async dispatch => {
  dispatch(setLoadingIngredients())
  await api.doAsyncGetRequest(
    'ingredients',
    (data) => {
      if (data.success) {
        dispatch(setDataIngredients(data.data))
        dispatch(initBurger())
      } else {
        dispatch(setErrorIngredients('Данные не получены'))
      }
    },
    (err) => {
      dispatch(setErrorIngredients(err.message))
    }
  )
}
