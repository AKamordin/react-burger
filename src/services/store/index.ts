import {createLogger} from "redux-logger"
import {configureStore} from "@reduxjs/toolkit"
import {combineReducers} from "redux";
import ingredientsReducer from "../slices/ingredients"
import orderReducer from "../slices/order"
import burgerReducer from "../slices/burger"
import popupReducer from "../slices/popup"
import authReducer from "../slices/auth"
import ordersReducer from "../slices/orders"
import historyReducer from "../slices/history"
import {ingredientsAPI} from "../api/ingredients";
import {orderAPI} from "../api/order";
import {authAPI} from "../api/auth";
import {passAPI} from "../api/pass";
import {ordersAPI} from "../api/orders";
import {historyAPI} from "../api/history";

const rootReducer = combineReducers(
  {
    ingredients : ingredientsReducer,
    order: orderReducer,
    popup: popupReducer,
    burger: burgerReducer,
    auth: authReducer,
    orders: ordersReducer,
    history: historyReducer,
    [ingredientsAPI.reducerPath]: ingredientsAPI.reducer,
    [orderAPI.reducerPath]: orderAPI.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [passAPI.reducerPath]: passAPI.reducer,
    [ordersAPI.reducerPath]: ordersAPI.reducer,
    [historyAPI.reducerPath]: historyAPI.reducer,
  }
)
const logger = createLogger()

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    logger,
    ingredientsAPI.middleware,
    orderAPI.middleware,
    authAPI.middleware,
    passAPI.middleware,
    ordersAPI.middleware,
    historyAPI.middleware
  ]),
  devTools: process.env.NODE_ENV === 'development',
  preloadedState: undefined
})

export default store
