import {statusCooking} from "../../utils/data";
import {BUN, DATA, ERROR, LOADING, ORDER, SET, TOTAL} from "../../utils/constants";

const calcTotal = (ingredients) => {
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
    case SET + LOADING + ORDER:
      return {
        ...state,
        loading: true,
      }
    case SET + DATA + ORDER:
      return {
        ...state,
        name: payload.name,
        number: payload.order.number,
        error: false,
        loading: false,
        message: null,
      }
    case SET + ERROR + ORDER:
      return {
        ...state,
        name: null,
        number: null,
        error: true,
        loading: false,
        message: payload,
      }
    case SET + TOTAL + ORDER:
      return {
        ...state,
        total: calcTotal(payload)
      }
    default: {
      return state
    }
  }
}


