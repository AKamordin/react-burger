import {
  SET_DATA_INGREDIENTS,
  SET_ERROR_INGREDIENTS,
  SET_LOADING_INGREDIENTS,
  SET_SELECTED_INGREDIENTS
} from "../actions/ingredients";

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
    case SET_LOADING_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          loading: true,
        },
      }
    case SET_DATA_INGREDIENTS:
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
    case SET_ERROR_INGREDIENTS:
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
    case SET_SELECTED_INGREDIENTS:
      return {
        ...state,
        selected: payload,
      }
    default: {
      return state
    }
  }
}
