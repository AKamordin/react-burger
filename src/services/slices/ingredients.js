import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/api";

const initialState = {
  ingredients: {
    data: [],
    loading: false,
    error: null,
  },
  selected: null,
}

export const getIngredients = createAsyncThunk(
  'ingredients/get',
  async () => {
    const response = await api.doAsyncGetRequest('ingredients')
    if (!response.success) {
      throw new Error(response.message)
    }
    return response.data
  }
)

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setSelected: (state, action) => {
      state.selected = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.ingredients.loading = true
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients.data = action.payload
        state.ingredients.loading = false
        state.ingredients.error = null
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.ingredients.data = []
        state.ingredients.loading = false
        state.ingredients.error = action.error.message
      })
  },
})

export const { setSelected } = ingredientsSlice.actions

export default ingredientsSlice.reducer;
