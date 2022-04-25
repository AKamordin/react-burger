import {DATA, ERROR, INGREDIENTS, LOADING, SELECTED, SET} from "../../utils/constants";
import api from "../../api/api";

export const SET_LOADING_INGREDIENTS = SET + LOADING + INGREDIENTS
export const SET_DATA_INGREDIENTS = SET + DATA + INGREDIENTS
export const SET_ERROR_INGREDIENTS = SET + ERROR + INGREDIENTS
export const SET_SELECTED_INGREDIENTS = SET + SELECTED + INGREDIENTS

export const setLoadingIngredients = () => (
  {
    type: SET_LOADING_INGREDIENTS,
  }
)

export const setDataIngredients = (value) => (
  {
    type: SET_DATA_INGREDIENTS,
    payload: value
  }
)

export const setErrorIngredients = (value) => (
  {
    type: SET_ERROR_INGREDIENTS,
    payload: value
  }
)

export const setSelectedIngredients = (value) => (
  {
    type: SET_SELECTED_INGREDIENTS,
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
      } else {
        dispatch(setErrorIngredients('Данные не получены'))
      }
    },
    (err) => {
      dispatch(setErrorIngredients(err.message))
    }
  )
}
