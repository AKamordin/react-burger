import {
  ADD_INGREDIENT_BURGER,
  DELETE_INGREDIENT_BURGER,
  INIT_DATA_BURGER,
  SET_INGREDIENT_BURGER,
  SORT_INGREDIENT_BURGER
} from "../actions/burger";

const initialState = {
  bun: null,
  ingredients: [],
}

export const burger = (state = initialState, {type, payload} = {}) => {
  switch (type) {
    case INIT_DATA_BURGER:
      return {
        ...state,
        ...initialState
      }
    case SET_INGREDIENT_BURGER:
      return {
        ...state,
        bun: payload,
      }
    case ADD_INGREDIENT_BURGER:
      return {
        ...state,
        ingredients: [...state.ingredients.slice(0, payload.index), {...payload.ingredient, uuid: payload.uuid}, ...state.ingredients.slice(payload.index)],
      }
    case DELETE_INGREDIENT_BURGER:
      return {
        ...state,
        ingredients: [...state.ingredients].filter((_, index) => index !== payload),
      }
    case SORT_INGREDIENT_BURGER:
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
