import { createStore } from 'effector-logger/macro'
import {statusCooking} from "../../utils/constants";

export const $name = createStore(null)
export const $number = createStore(null)
export const $status = createStore(statusCooking)
export const $total = createStore(0)
export const $loading = createStore(false)
export const $error = createStore(null)
