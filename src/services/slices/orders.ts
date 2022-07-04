import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IOrders, IOrdersResponse} from "../types/orders";

const initialState: IOrders = {
  orders: [],
  total: 0,
  totalToday: 0,
}

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<IOrdersResponse>) => {
      state.orders = action.payload.success ? action.payload.orders : []
      state.total = action.payload.success ? action.payload.total : 0
      state.totalToday = action.payload.success ? action.payload.totalToday : 0
    },
  },
})

export const {setData} = ordersSlice.actions

export default ordersSlice.reducer
