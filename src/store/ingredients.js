import {action, makeObservable, observable, runInAction} from "mobx"
import api from "../api/api"
import {makeLoggable} from "mobx-log";

export default class Ingredients {
  data = []
  loading = false
  error = null
  selected = null

  constructor(store) {
    this.store = store
    makeObservable(this, {
      data: observable,
      loading: observable,
      error: observable,
      selected: observable,
      getIngredients: action,
      setSelectedIngredient: action
    })
    makeLoggable(this)
    runInAction(this.getIngredients)
  }

  getIngredients = async () => {
    this.loading = true
    await api.doAsyncGetRequest(
      'ingredients',
      (data) => {
        if (data.success) {
          this.data = data.data
          this.error = null
          this.loading = false
        } else {
          this.error = data.message
          this.loading = false
        }
      },
      (err) => {
        this.error = err.message
        this.loading = false
      }
    )
  }

  setSelectedIngredient = (ingredient) => {
    this.selected = ingredient
  }
}
