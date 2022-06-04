import {BUN, MAIN, SAUCE} from "../../utils/constants";
import {createSelector} from "@reduxjs/toolkit";

export const allIngredientsSelector = ({ingredients}) => ingredients.ingredients.data

export const bunIngredientsSelector = createSelector(
  allIngredientsSelector,
  items => items ? items.filter(i => i.type === BUN.key) : []
)

export const sauceIngredientsSelector = createSelector(
  allIngredientsSelector,
  items => items ? items.filter(i => i.type === SAUCE.key) : []
)

export const mainIngredientsSelector = createSelector(
  allIngredientsSelector,
  items => items ? items.filter(i => i.type === MAIN.key) : []
)

export const errorIngredientsSelector = ({ingredients}) => ingredients.ingredients.error
export const loadingIngredientsSelector = ({ingredients}) => ingredients.ingredients.loading
export const selectedIngredientSelector = ({ingredients}) => ingredients.selected
