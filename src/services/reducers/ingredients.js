import {DATA, ERROR, INGREDIENTS, LOADING, SELECTED, SET} from "../../utils/constants";

const initialState = {
  ingredients: {
    data: [],
    loading: false,
    error: false,
    message: null,
  },
  selected: null,
}

export const ingredients = (state = initialState, {type, payload} = {}) => {
  switch (type) {
    case SET + LOADING + INGREDIENTS:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          loading: true,
        },
      }
    case SET + DATA + INGREDIENTS:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          data: payload,
          error: false,
          loading: false,
          message: null,
        },
      }
    case SET + ERROR + INGREDIENTS:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          data: [],
          error: true,
          loading: false,
          message: payload,
        },
      }
    case SET + SELECTED + INGREDIENTS:
      return {
        ...state,
        selected: payload,
      }
    default: {
      return state
    }
  }
}
