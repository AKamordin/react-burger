import {DATA, INIT, BURGER, INGREDIENT, SET, ADD, DELETE, SORT} from "../../utils/constants";

export const initBurger = () => (
  {
    type: INIT + DATA + BURGER,
  }
)

export const setBun = (ingredient) => (
  {
    type: SET + INGREDIENT + BURGER,
    payload: ingredient,
  }
)

export const addIngredient = (index, ingredient) => (
  {
    type: ADD + INGREDIENT + BURGER,
    payload: {index: index, ingredient: ingredient},
  }
)

export const deleteIngredient = (index) => (
  {
    type: DELETE + INGREDIENT + BURGER,
    payload: index,
  }
)

export const sortIngredient = (fromIndex, toIndex) => (
  {
    type: SORT + INGREDIENT + BURGER,
    payload: {fromIndex: fromIndex, toIndex: toIndex},
  }
)
