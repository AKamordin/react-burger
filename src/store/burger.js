import {action, autorun, makeObservable, observable} from "mobx";
import {makeLoggable} from "mobx-log";
import {BUN} from "../utils/constants";

export default class Burger {
  bun = null
  ingredients = []

  constructor(store) {
    this.store = store
    makeObservable(this, {
      bun: observable,
      ingredients: observable,
      initBurger: action,
      setBun: action,
      addIngredient: action,
      deleteIngredient: action,
      sortIngredient: action,
    })
    autorun(this.calcTotal)
    makeLoggable(this)
  }

  calcTotal = () => {
    let total
    let items
    if (this.bun) {
      items = [this.bun, ...this.ingredients]
    } else {
      items = [...this.ingredients]
    }
    if (!items) {
      total = 0
    } else {
      total = items.reduce((acc, cur) => acc + (cur.type === BUN.key ? 2 : 1) * cur.price, 0)
    }
    this.store.orderStore.setTotal(total)
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
