import {POPUP, SET, UNSET} from "../../utils/constants";

export const SET_POPUP = SET + POPUP
export const UNSET_POPUP = UNSET + POPUP

export const setPopup = value => (
  {
    type: SET_POPUP,
    payload: value,
  }
)

export const unsetPopup = () => (
  {
    type: UNSET_POPUP,
  }
)
