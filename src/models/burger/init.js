import {$bun, $ingredients} from "./store";
import {addIngredient, deleteIngredient, initBurger, setBun, sortIngredient} from "./events";

$bun
  .on(setBun, (_, item) => item)
  .reset(initBurger)

$ingredients
  .on(addIngredient, (state, {index, ingredient, uuid}) => [...state.slice(0, index), {...ingredient, uuid: uuid}, ...state.slice(index)])
  .on(deleteIngredient, (state, index) => [...state].filter((_, i) => i !== index))
  .on(sortIngredient, (state, {fromIndex, toIndex}) => {
    const array = [...state];
    array.splice(toIndex, 0, ...array.splice(fromIndex, 1))
    return [...array]
  })
  .reset(initBurger)
