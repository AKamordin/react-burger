import {DATA, ERROR, LOADING, ORDER, SET, TOTAL} from "../../utils/constants";
import api from "../../api/api";
import {setPopup} from "./popup";

export const setLoadingOrder = () => (
  {
    type: SET + LOADING + ORDER,
  }
)

export const setDataOrder = (value) => (
  {
    type: SET + DATA + ORDER,
    payload: value,
  }
)

export const setTotalOrder = (value) => (
  {
    type: SET + TOTAL + ORDER,
    payload: value,
  }
)

export const setErrorOrder = (value) => (
  {
    type: SET + ERROR + ORDER,
    payload: value,
  }
)

export const makeOrder = (ids) => async dispatch => {
  dispatch(setLoadingOrder())
  await api.doAsyncPostRequest(
    'orders',
    {
      ingredients: ids,
    },
    (data) => {
      if (data.success) {
        dispatch(setDataOrder(data))
        dispatch(setPopup(ORDER));
      } else {
        dispatch(setErrorOrder(data.message))
      }
    },
    (err) => {
      dispatch(setErrorOrder(err.message))
    }
  );
}
