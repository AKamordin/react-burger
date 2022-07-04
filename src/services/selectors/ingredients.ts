import {RootState} from "../types";
import {BUN, MAIN, SAUCE} from "../../utils/constants";
import {createSelector} from "@reduxjs/toolkit";
import {IIngredient} from "../types/ingredients";

export const allIngredientsSelector = (state: RootState) => state.ingredients.ingredients

export const bunIngredientsSelector = createSelector(
  allIngredientsSelector,
  items => items ? items.filter((i: IIngredient) => i.type === BUN.key) : []
)

export const sauceIngredientsSelector = createSelector(
  allIngredientsSelector,
  items => items ? items.filter((i: IIngredient) => i.type === SAUCE.key) : []
)

export const mainIngredientsSelector = createSelector(
  allIngredientsSelector,
  items => items ? items.filter((i: IIngredient) => i.type === MAIN.key) : []
)

export const errorIngredientsSelector = (state: RootState)  => state.ingredients.error
export const loadingIngredientsSelector = (state: RootState)  => state.ingredients.loading
