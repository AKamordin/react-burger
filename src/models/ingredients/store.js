import { createStore } from 'effector-logger/macro'

export const $loading = createStore(false)
export const $data = createStore([])
export const $error = createStore(null)
export const $selected = createStore(null)
