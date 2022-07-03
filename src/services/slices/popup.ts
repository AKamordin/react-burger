import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {EPopupType, IPopup} from "../types/popup";

const initialState: IPopup = {
  show: false,
  type: null,
}

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    setPopup: (state, action: PayloadAction<EPopupType>) => {
      state.show = true
      state.type = action.payload
    },
    unsetPopup : () => initialState,
  },
})

export const { setPopup, unsetPopup } = popupSlice.actions

export default popupSlice.reducer;
