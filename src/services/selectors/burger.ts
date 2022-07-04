import {RootState} from "../types";
import {BUN} from "../../utils/constants";
import {createSelector} from "@reduxjs/toolkit";
import {IIngredient} from "../types/ingredients";

export const bunBurgerSelector = (state: RootState) => state.burger.bun
export const ingredientsBurgerSelector = (state: RootState) => state.burger.ingredients

export const totalSelector = createSelector(
  [bunBurgerSelector, ingredientsBurgerSelector],
  (bun, ingredients) => (bun ? [bun, ...ingredients] : [...ingredients]).reduce((acc, cur: IIngredient) => acc + (cur.type === BUN.key ? 2 : 1) * cur.price, 0)
)
