import {action, computed, makeObservable, observable} from "mobx";
import {makeLoggable} from "mobx-log";
import {BUN} from "../utils/constants";

export default class Burger {
  bun = null
  ingredients = []

  constructor(store) {
    this.store = store
    makeObservable(this, {
      bun: observable.struct,
      ingredients: observable,
      total: computed,
      initBurger: action,
      setBun: action,
      addIngredient: action,
      deleteIngredient: action,
      sortIngredient: action,
    })
    makeLoggable(this)
  }

  get total() {
    return (this.bun ? [this.bun, ...this.ingredients] : [...this.ingredients]).reduce((acc, cur) => acc + (cur.type === BUN.key ? 2 : 1) * cur.price, 0)
  }

  initBurger = () => {
    this.bun = null
    this.ingredients = []
  }

  setBun = ingredient => {
    this.bun = ingredient
  }

  addIngredient = (index, ingredient, uuid) => {
    this.ingredients.splice(index, 0, {...ingredient, uuid: uuid})
  }

  deleteIngredient = index => {
    this.ingredients.splice(index, 1)
  }

  sortIngredient = (fromIndex, toIndex) => {
    this.ingredients.splice(toIndex, 0, ...this.ingredients.splice(fromIndex, 1))
  }

}
