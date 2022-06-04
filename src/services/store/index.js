import {createLogger} from "redux-logger"
import {configureStore} from "@reduxjs/toolkit"
import {monitor} from "../enhansers";
import {combineReducers} from "redux";
import ingredientsReducer from "../slices/ingredients"
import orderReducer from "../slices/order"
import burgerReducer from "../slices/burger"
import popupReducer from "../slices/popup"
import {ingredientsAPI} from "../api/ingredients";
import {orderAPI} from "../api/order";

const rootReducer = combineReducers(
  {
    ingredients : ingredientsReducer,
    order: orderReducer,
    popup: popupReducer,
    burger: burgerReducer,
    [ingredientsAPI.reducerPath]: ingredientsAPI.reducer,
    [orderAPI.reducerPath]: orderAPI.reducer,
  }
)
const logger = createLogger()

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([logger, ingredientsAPI.middleware, orderAPI.middleware]),
  devTools: process.env.NODE_ENV === 'development',
  preloadedState: undefined,
  enhancers: [monitor]
})

export default store
