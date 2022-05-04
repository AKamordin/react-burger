import {createSlice} from "@reduxjs/toolkit";
import {v4 as getUUID} from "uuid";

const initialState = {
  bun: null,
  ingredients: [],
}

export const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    initBurger: () => initialState,
    setBun: (state, action) => {
        state.bun = action.payload
    },
    addIngredient: (state, action) => {
        state.ingredients.splice(action.payload.index, 0, {...action.payload.ingredient, uuid: getUUID()})
    },
    deleteIngredient: (state, action) => {
        this.ingredients.splice(action.payload, 1)
    },
    sortIngredient: (state, action) => {
        state.ingredients.splice(action.payload.toIndex, 0, ...state.ingredients.splice(action.payload.fromIndex, 1))
    },
  },
})

export const { initBurger, setBun, addIngredient, deleteIngredient, sortIngredient } = burgerSlice.actions

export default burgerSlice.reducer;
