import {POPUP, SET, UNSET} from "../../utils/constants";

export const setPopup = value => (
  {
    type: SET + POPUP,
    payload: value,
  }
)

export const unsetPopup = () => (
  {
    type: UNSET + POPUP,
  }
)
