import {statusCreated} from "../../utils/constants";
import {createSlice} from "@reduxjs/toolkit";
import {orderAPI} from "../api/order";

const initialState = {
  name: null,
  number: null,
  status: statusCreated,
  loading: false,
  error: null,
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    initDataOrder: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(orderAPI.endpoints.makeOrder.matchPending, (state) => {
        state.loading = true
      })
      .addMatcher(orderAPI.endpoints.makeOrder.matchFulfilled, (state, action) => {
        state.name =  action.payload.success ? action.payload.name : null
        state.number = action.payload.success ? action.payload.order.number : null
        state.error = action.payload.success ? null : ('Статус: ' + action.payload.status + '. ' + action.error.message)
        state.loading = false
      })
      .addMatcher(orderAPI.endpoints.makeOrder.matchRejected, (state, action) => {
        state.name =  null
        state.number = null
        state.error = action.payload.data.message ? 'Статус: ' + action.payload.status + '. ' + action.payload.data.message : 'Статус: ' + action.payload.originalStatus + '. ' + action.error.message
        state.loading = false
      })
  },
})

export const { initDataOrder } = orderSlice.actions

export default orderSlice.reducer;
