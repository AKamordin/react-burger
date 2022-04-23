import {data} from "../../utils/data";
import {ADD, BURGER, DATA, DELETE, INGREDIENT, INIT, SET, SORT} from "../../utils/constants";

const initialState = {
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

export const burger = (state = initialState, {type, payload} = {}) => {
  switch (type) {
    case INIT + DATA + BURGER:
      return {
        ...state,
        bun: testBurger[0],
        ingredients: testBurger.slice(1)
      }
    case SET + INGREDIENT + BURGER:
      return {
        ...state,
        bun: payload,
      }
    case ADD + INGREDIENT + BURGER:
      return {
        ...state,
        ingredients: [...state.ingredients.slice(0, payload.index), payload.ingredient, ...state.ingredients.slice(payload.index)],
      }
    case DELETE + INGREDIENT + BURGER:
      return {
        ...state,
        ingredients: [...state.ingredients].filter((_, index) => index !== payload),
      }
    case SORT + INGREDIENT + BURGER:
      const array = [...state.ingredients];
      array.splice(payload.toIndex, 0, ...array.splice(payload.fromIndex, 1))
      return {
        ...state,
        ingredients: [...array],
      }
    default: {
      return state
    }
  }
}
