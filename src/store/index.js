import React from "react";
import Ingredients from "./ingredients"
import Popup from "./popup"
import Order from "./order";
import Burger from "./burger";

class Store {
  constructor() {
    this.ingredientsStore = new Ingredients(this)
    this.popupStore = new Popup(this)
    this.orderStore = new Order(this)
    this.burgerStore = new Burger(this)
  }
}

const storeContext = React.createContext(new Store());

export const useStore = () => React.useContext(storeContext);
