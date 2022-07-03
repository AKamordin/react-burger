import {RootState} from "../types";

export const numberOrderSelector = (state: RootState) => state.order.number
export const statusOrderSelector = (state: RootState) => state.order.status
export const loadingOrderSelector = (state: RootState) => state.order.loading
export const errorOrderSelector = (state: RootState) => state.order.error
