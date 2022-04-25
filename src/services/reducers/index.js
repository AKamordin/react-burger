import {combineReducers} from "redux";

import {ingredients} from "./ingredients";
import {order} from "./order";
import {popup} from "./popup";
import {burger} from "./burger";

const rootReducer = combineReducers(
  {
    ingredients : ingredients,
    order: order,
    popup: popup,
    burger: burger,
  }
)

export default rootReducer
