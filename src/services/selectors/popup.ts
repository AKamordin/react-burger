import {RootState} from "../types";

export const showPopupSelector = (state: RootState) => state.popup.show
export const typePopupSelector = (state: RootState) => state.popup.type
