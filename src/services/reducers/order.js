import {BUN, statusCooking} from "../../utils/constants";
import {INIT_DATA_ORDER, SET_DATA_ORDER, SET_ERROR_ORDER, SET_LOADING_ORDER, SET_TOTAL_ORDER} from "../actions/order";

const calcTotal = (ingredients) => {
  if (!ingredients) {
    return 0
  }
  return ingredients.reduce((acc, cur) => acc + (cur.type === BUN.key ? 2 : 1) * cur.price, 0)
}

const initialState = {
  name: null,
  number: null,
  status: statusCooking,
  total: 0,
  loading: false,
  error: false,
  message: null,
}

export const order = (state = initialState, {type, payload} = {}) => {
  switch (type) {
    case INIT_DATA_ORDER:
      return {
        ...state,
        ...initialState,
      }
    case SET_LOADING_ORDER:
      return {
        ...state,
        loading: true,
      }
    case SET_DATA_ORDER:
      return {
        ...state,
        name: payload.name,
        number: payload.order.number,
        error: false,
        loading: false,
        message: null,
      }
    case SET_ERROR_ORDER:
      return {
        ...state,
        name: null,
        number: null,
        error: true,
        loading: false,
        message: payload,
      }
    case SET_TOTAL_ORDER:
      return {
        ...state,
        total: calcTotal(payload)
      }
    default: {
      return state
    }
  }
}


