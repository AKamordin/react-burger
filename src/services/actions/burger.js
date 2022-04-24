import {DATA, INIT, BURGER, INGREDIENT, SET, ADD, DELETE, SORT} from "../../utils/constants";

export const INIT_DATA_BURGER = INIT + DATA + BURGER
export const SET_INGREDIENT_BURGER = SET + INGREDIENT + BURGER
export const ADD_INGREDIENT_BURGER = ADD + INGREDIENT + BURGER
export const DELETE_INGREDIENT_BURGER = DELETE + INGREDIENT + BURGER
export const SORT_INGREDIENT_BURGER = SORT + INGREDIENT + BURGER

export const initBurger = () => (
  {
    type: INIT_DATA_BURGER,
  }
)

export const setBun = (ingredient) => (
  {
    type: SET_INGREDIENT_BURGER,
    payload: ingredient,
  }
)

export const addIngredient = (index, ingredient) => (
  {
    type: ADD_INGREDIENT_BURGER,
    payload: {index: index, ingredient: ingredient},
  }
)

export const deleteIngredient = (index) => (
  {
    type: DELETE_INGREDIENT_BURGER,
    payload: index,
  }
)

export const sortIngredient = (fromIndex, toIndex) => (
  {
    type: SORT_INGREDIENT_BURGER,
    payload: {fromIndex: fromIndex, toIndex: toIndex},
  }
)
