import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  total: 0,
  totalToday: 0,
}

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.orders = action.payload.success ? action.payload.orders : []
      state.total = action.payload.success ? action.payload.total : 0
      state.totalToday = action.payload.success ? action.payload.totalToday : 0
    },
  },
})

export const {setData} = historySlice.actions

export default historySlice.reducer
