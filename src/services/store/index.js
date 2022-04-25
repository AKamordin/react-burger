import {createLogger} from "redux-logger"
import rootReducer from "../reducers"
import {configureStore} from "@reduxjs/toolkit"
import {monitor} from "../enhansers";

const logger = createLogger()

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV === 'development',
  preloadedState: undefined,
  enhancers: [monitor]
})

export default store
