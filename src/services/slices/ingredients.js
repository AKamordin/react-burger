import {createSlice} from "@reduxjs/toolkit";
import {ingredientsAPI} from "../api/ingredients";

const initialState = {
  ingredients: {
    data: [],
    loading: false,
    error: null,
  },
  selected: null,
}

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
      .addMatcher(ingredientsAPI.endpoints.getIngredients.matchPending, (state) => {
        state.ingredients.loading = true
      })
      .addMatcher(ingredientsAPI.endpoints.getIngredients.matchFulfilled, (state, action) => {
        state.ingredients.data = action.payload.success ? action.payload.data : []
        state.ingredients.loading = false
        state.ingredients.error = action.payload.success ? null : ('Статус: ' + action.payload.originalStatus + '. ' + action.error.message)
      })
      .addMatcher(ingredientsAPI.endpoints.getIngredients.matchRejected, (state, action) => {
        state.ingredients.data = []
        state.ingredients.loading = false
        state.ingredients.error = 'Статус: ' + action.payload.originalStatus + '. ' + action.error.message
      })
  },
})

export const { setSelected } = ingredientsSlice.actions

export default ingredientsSlice.reducer;
