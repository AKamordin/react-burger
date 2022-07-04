import {createSlice} from "@reduxjs/toolkit";
import {ingredientsAPI} from "../api/ingredients";
import {IIngredients} from "../types/ingredients";
import {IResponse} from "../types";

const initialState: IIngredients = {
  ingredients: [],
  loading:     false,
  error:       null,
}

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(ingredientsAPI.endpoints.getIngredients.matchPending, (state) => {
        state.loading = true
      })
      .addMatcher(ingredientsAPI.endpoints.getIngredients.matchFulfilled, (state, action) => {
        state.ingredients = action.payload.success ? action.payload.data : []
        state.loading = false
        state.error = action.payload.success ? null : ('Статус: ' + action.payload.originalStatus + '. ' + action.payload.message)
      })
      .addMatcher(ingredientsAPI.endpoints.getIngredients.matchRejected, (state, action) => {
        state.loading = false
        if (action.error?.name !== "ConditionError") {
          state.ingredients = []
          const message = (action.payload?.data as IResponse).message
          state.error = message ? message : 'Статус: ' + (action.payload as IResponse).originalStatus + '. ' + action.error.message
        }
      })
  },
})

export default ingredientsSlice.reducer;
