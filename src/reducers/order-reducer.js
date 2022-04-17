import {data, statusCooking} from "../utils/data";
import {BUN, DATA, ERROR, INIT, LOADING, ORDER, SET} from "../utils/constants";

const emptyBurger = {
  bun: null,
  ingredients: [],
}

const testBurger = [
  data.filter(d => d._id === "60d3b41abdacab0026a733c6")[0],
  data.filter(d => d._id === "60d3b41abdacab0026a733ce")[0],
  data.filter(d => d._id === "60d3b41abdacab0026a733c9")[0],
  data.filter(d => d._id === "60d3b41abdacab0026a733d1")[0],
  data.filter(d => d._id === "60d3b41abdacab0026a733d0")[0],
  data.filter(d => d._id === "60d3b41abdacab0026a733d0")[0],
]

function calcTotal(ingredients) {
  return ingredients.reduce((acc, cur) => acc + (cur.type === BUN.key ? 2 : 1) * cur.price, 0)
}

export const orderInitialState = {
  name: null,
  number: null,
  status: statusCooking,
  burger: emptyBurger,
  total: 0,
  loading: false,
  error: false,
  message: null,
}

export default function orderReducer(state, action) {
  switch (action.type) {
    case SET + LOADING + ORDER:
      return {
        ...state,
        loading: true,
      }
    case SET + DATA + ORDER:
      return {
        ...state,
        name: action.payload.name,
        number: action.payload.order.number,
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
        message: action.payload,
      }
    case INIT + DATA + ORDER:
      return {
        ...state,
        total: calcTotal(testBurger),
        burger: {
          bun: testBurger[0],
          ingredients: testBurger.slice(1)
        }
      }
    default:
      return state
  }
}


