import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  show: false,
  type: null,
}

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    setPopup: (state, action) => {
      state.show = true
      state.type = action.payload
    },
    unsetPopup : () => initialState,
  },
})

export const { setPopup, unsetPopup } = popupSlice.actions

export default popupSlice.reducer;
