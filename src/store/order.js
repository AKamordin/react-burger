import {action, makeObservable, observable} from "mobx"
import api from "../api/api"
import {makeLoggable} from "mobx-log";
import {ORDER, statusCooking} from "../utils/constants";

export default class Order {
  name = null
  number = null
  status = statusCooking
  total = 0
  loading = false
  error = null

  constructor(store) {
    this.store = store
    makeObservable(this, {
      name: observable,
      number: observable,
      status: observable,
      total: observable,
      loading : observable,
      error : observable,
      makeOrder: action,
      makeSuccess: action,
      makeError: action,
      initOrder: action,
      setTotal: action,
    })
    makeLoggable(this)
  }

  makeSuccess = data => {
    this.name = data.name
    this.number = data.order.number
    this.error = null
    this.loading = false
  }

  makeError = (message) => {
    this.error = message
    this.loading = false
  }

  makeOrder = async (ids) => {
    this.loading = true
    await api.doAsyncPostRequest(
      'orders',
      {
        ingredients: ids,
      },
      (data) => {
        if (data.success) {
          this.makeSuccess(data)
          this.store.popupStore.setPopup(ORDER)
        } else {
          this.makeError(data.message)
        }
      },
      (err) => {
        this.makeError(err.message)
      }
    )
  }

  initOrder = () => {
    this.name = null
    this.number = null
    this.status = statusCooking
    this.total = 0
    this.loading = false
    this.error = null
  }

  setTotal = total => {
    this.total = total
  }

}
