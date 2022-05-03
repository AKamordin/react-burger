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
      data: observable.ref,
      loading: observable,
      error: observable,
      selected: observable.struct,
      getIngredients: action,
      getSuccess: action,
      getError: action,
      setSelectedIngredient: action
    })
    makeLoggable(this)
    runInAction(this.getIngredients)
  }

  getSuccess = data => {
    this.data = data
    this.error = null
    this.loading = false
  }

  getError = (message) => {
    this.error = message
    this.loading = false
  }

  getIngredients = async () => {
    this.loading = true
    await api.doAsyncGetRequest(
      'ingredients',
      (data) => {
        if (data.success) {
          this.getSuccess(data.data)
        } else {
          this.getError(data.message)
        }
      },
      (err) => {
        this.getError(err.message)
      }
    )
  }

  setSelectedIngredient = (ingredient) => {
    this.selected = ingredient
  }
}
