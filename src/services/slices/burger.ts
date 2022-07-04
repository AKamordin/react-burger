import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {v4 as getUUID} from "uuid";
import {IBurger, IIndexedIngredient} from "../types/burger";
import {IIngredient} from "../types/ingredients";
import {IIndexRange} from "../types";

const initialState: IBurger = {
  bun: null,
  ingredients: [],
}

export const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    initBurger: () => initialState,
    setBun: (state, action: PayloadAction<IIngredient>) => {
        state.bun = action.payload
    },
    addIngredient: (state, action: PayloadAction<IIndexedIngredient>) => {
        state.ingredients.splice(action.payload.index, 0, {...action.payload.ingredient, uuid: getUUID()})
    },
    deleteIngredient: (state, action: PayloadAction<number>) => {
        state.ingredients.splice(action.payload, 1)
    },
    sortIngredient: (state, action: PayloadAction<IIndexRange>) => {
        state.ingredients.splice(action.payload.toIndex, 0, ...state.ingredients.splice(action.payload.fromIndex, 1))
    },
  },
})

export const { initBurger, setBun, addIngredient, deleteIngredient, sortIngredient } = burgerSlice.actions

export default burgerSlice.reducer;
