import {DATA, ERROR, INIT, LOADING, ORDER, SET, TOTAL} from "../../utils/constants";
import api from "../../api/api";
import {setPopup} from "./popup";

export const INIT_DATA_ORDER = INIT + DATA + ORDER
export const SET_LOADING_ORDER = SET + LOADING + ORDER
export const SET_DATA_ORDER = SET + DATA + ORDER
export const SET_TOTAL_ORDER = SET + TOTAL + ORDER
export const SET_ERROR_ORDER = SET + ERROR + ORDER

export const initDataOrder = () => (
  {
    type: INIT_DATA_ORDER,
  }
)

export const setLoadingOrder = () => (
  {
    type: SET_LOADING_ORDER,
  }
)

export const setDataOrder = (value) => (
  {
    type: SET_DATA_ORDER,
    payload: value,
  }
)

export const setTotalOrder = (value) => (
  {
    type: SET_TOTAL_ORDER,
    payload: value,
  }
)

export const setErrorOrder = (value) => (
  {
    type: SET_ERROR_ORDER,
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
