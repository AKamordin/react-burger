import {POPUP, SET, UNSET} from "../../utils/constants";

export const initialState = {
  show: false,
  type: null,
}

export const popup = (state = initialState, {type, payload} = {}) => {
  switch (type) {
    case SET + POPUP: {
      return {
        ...state,
        show: true,
        type: payload,
      }
    }
    case UNSET + POPUP: {
      return {
        ...state,
        ...initialState
      }
    }
    default: {
      return state
    }
  }
}

