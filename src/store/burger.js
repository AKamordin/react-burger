import {types} from "mobx-state-tree";
import {BUN} from "../utils/constants";
import {Ingredient} from "./ingredients";

const Burger = types.model('Burger', {
  bun: types.maybeNull(Ingredient),
  ingredients: types.optional(types.array(Ingredient), []),
}).actions(self => {
  return {
    initBurger() {
      self.bun = null
      self.ingredients = []
    },
    setBun(ingredient) {
      self.bun = {...ingredient}
    },
    addIngredient(index, ingredient, uuid) {
      self.ingredients.splice(index, 0, {...ingredient, uuid: uuid})
    },
    deleteIngredient(index) {
      self.ingredients.splice(index, 1)
    },
    sortIngredient(fromIndex, toIndex) {
      self.ingredients.splice(toIndex, 0, ...self.ingredients.splice(fromIndex, 1))
    },
  }
}).views(self => ({
  get total() {
    return (self.bun ? [self.bun, ...self.ingredients] : [...self.ingredients]).reduce((acc, cur) => acc + (cur.type === BUN.key ? 2 : 1) * cur.price, 0)
  },
}))
export default Burger;
