import {$bun, $ingredients} from "./store";
import {addIngredient, deleteIngredient, initBurger, setBun, sortIngredient} from "./events";

export const modelBurger = {
  $bun,
  $ingredients,
  initBurger,
  setBun,
  addIngredient,
  deleteIngredient,
  sortIngredient
}
