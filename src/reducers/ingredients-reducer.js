import {DATA, ERROR, INGREDIENTS, LOADING, SET} from "../utils/constants";

export const ingredientsInitialState = {
  data: [],
  loading: false,
  error: false,
  message: null,
}

export default function ingredientsReducer(state, action) {
  switch (action.type) {
    case SET + LOADING + INGREDIENTS:
      return {
        ...state,
        loading: true,
      }
    case SET + DATA + INGREDIENTS:
      return {
        ...state,
        data: action.payload,
        error: false,
        loading: false,
        message: null,
      }
    case SET + ERROR + INGREDIENTS:
      return {
        ...state,
        data: [],
        error: true,
        loading: false,
        message: action.payload,
      }
    default:
      return state
  }
}
