import {BUN, statusCooking} from "../../utils/constants";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/api";

const calcTotal = (ingredients) => {
  if (!ingredients) {
    return 0
  }
  return ingredients.reduce((acc, cur) => acc + (cur.type === BUN.key ? 2 : 1) * cur.price, 0)
}

const initialState = {
  name: null,
  number: null,
  status: statusCooking,
  total: 0,
  loading: false,
  error: null,
}

export const makeOrder = createAsyncThunk(
  'order/make',
  async (ids) => {
    const response = await api.doAsyncPostRequest('orders', {ingredients: ids})
    if (!response.success) {
      throw new Error(response.message)
    }
    return response
  }
)

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    initDataOrder: () => initialState,
    setTotalOrder: (state, action) => {
      state.total = calcTotal(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(makeOrder.pending, (state) => {
        state.loading = true
      })
      .addCase(makeOrder.fulfilled, (state, action) => {
        state.name =  action.payload.name
        state.number = action.payload.order.number
        state.error = null
        state.loading = false
      })
      .addCase(makeOrder.rejected, (state, action) => {
        state.name =  null
        state.number = null
        state.error = action.error.message
        state.loading = false
      })
  },
})

export const { initDataOrder, setTotalOrder } = orderSlice.actions

export default orderSlice.reducer;
