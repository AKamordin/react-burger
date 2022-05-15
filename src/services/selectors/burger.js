import {BUN} from "../../utils/constants";
import {createSelector} from "@reduxjs/toolkit";

export const bunBurgerSelector = ({burger}) => burger.bun
export const ingredientsBurgerSelector = ({burger}) => burger.ingredients

export const totalSelector = createSelector(
  [bunBurgerSelector, ingredientsBurgerSelector],
  (bun, ingredients) => (bun ? [bun, ...ingredients] : [...ingredients]).reduce((acc, cur) => acc + (cur.type === BUN.key ? 2 : 1) * cur.price, 0)
)
