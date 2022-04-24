import {SET_POPUP, UNSET_POPUP} from "../actions/popup";

export const initialState = {
  show: false,
  type: null,
}

export const popup = (state = initialState, {type, payload} = {}) => {
  switch (type) {
    case SET_POPUP: {
      return {
        ...state,
        show: true,
        type: payload,
      }
    }
    case UNSET_POPUP: {
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

