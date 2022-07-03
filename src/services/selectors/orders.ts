import {RootState} from "../types";
import {createSelector} from "@reduxjs/toolkit";
import {statusDone, statusPending} from "../../utils/constants";

export const ordersSelector = (state: RootState) => state.orders.orders
export const totalOrderSelector = (state: RootState) => state.orders.total
export const totalTodayOrderSelector = (state: RootState) => state.orders.totalToday

export const pendingOrdersSelector = createSelector(
  ordersSelector,
  items => items ? items.filter(i => i.status === statusPending.key) : []
)

export const doneOrdersSelector = createSelector(
  ordersSelector,
  items => items ? items.filter(i => i.status === statusDone.key) : []
)
