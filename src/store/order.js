import {flow, getRoot, types} from "mobx-state-tree";
import api from "../api/api";
import {ORDER, statusCooking} from "../utils/constants";

export const OrderStatus = types.model('OrderStatus', {
  key: types.maybe(types.string),
  value: types.maybe(types.string),
});

const Order = types.model('Order', {
  name: types.maybe(types.string),
  number: types.maybeNull(types.integer),
  status: types.optional(OrderStatus, statusCooking),
  loading: false,
  error: types.maybeNull(types.string),
}).actions(self => {
  return {
    initOrder() {
      self.name = ''
      self.number = null
      self.status = statusCooking
      self.loading = false
      self.error = null
    },
    makeOrder: flow(function* (ids) {
      self.loading = true
      yield api.doAsyncPostRequest(
        'orders',
        {
          ingredients: ids,
        },
        (data) => {
          if (data.success) {
            self.makeSuccess(data)
            const root = getRoot(self)
            root.popupStore.setPopup(ORDER)
          } else {
            self.makeError(data.message)
          }
        },
        (err) => {
          self.makeError(err.message)
        }
      )
    }),
    makeSuccess(data) {
      self.name = data.name
      self.number = data.order.number
      self.error = null
      self.loading = false
    },
    makeError(message) {
      self.error = message
      self.loading = false
    },
  }
})

export default Order;
