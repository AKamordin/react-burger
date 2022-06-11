import {createSelector} from "@reduxjs/toolkit";
import {statusDone, statusPending} from "../../utils/constants";

export const ordersSelector = ({orders}) => orders.orders
export const totalOrderSelector = ({orders}) => orders.total
export const totalTodayOrderSelector = ({orders}) => orders.totalToday

export const pendingOrdersSelector = createSelector(
  ordersSelector,
  items => items ? items.filter(i => i.status === statusPending.key) : []
)

export const doneOrdersSelector = createSelector(
  ordersSelector,
  items => items ? items.filter(i => i.status === statusDone.key) : []
)
