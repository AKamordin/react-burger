export const BASE_API_URL = 'https://norma.nomoreparties.space/api';
export const AUTH_API_URL = BASE_API_URL + '/auth';
export const WSS_ORDERS_ALL = 'wss://norma.nomoreparties.space/orders/all';
export const WSS_ORDERS = 'wss://norma.nomoreparties.space/orders';
export const BUN = {key: 'bun', value : 'Булки'};
export const SAUCE = {key: 'sauce', value : 'Соусы'};
export const MAIN = {key: 'main', value : 'Начинки'};
export const INGREDIENT_GROUPS = [BUN, SAUCE, MAIN];

// Popup type
export const INGREDIENTS = "INGREDIENTS"
export const ORDER = "ORDER"

// Order
export const MAX_DISPLAY_ITEMS = 6
export const ITEM_DISPLAY_SIZE = 48

// Order Status
export const statusCreated = {key: 'created', name: 'Создан', value: 'Ваш заказ начали готовить'}
export const statusPending = {key: 'pending', name: 'Готовится', value: 'Ваш заказ готовится'}
export const statusDone = {key: 'done', name: 'Выполнен', value: 'Ваш заказ готов'}
export const statusCancel = {key: 'cancel', name: 'Отменен', value: 'Ваш заказ отменен'}

export type TStatus = 'created' | 'pending' | 'done' | 'cancel'

export const statusMap: {
  [key in TStatus]: {key: string, name: string, value: string}
} = {
  created: statusCreated,
  pending: statusPending,
  done   : statusDone,
  cancel : statusCancel
}

