import { types } from 'mobx-state-tree';
import Ingredients from './ingredients';
import Order from './order';
import Popup from './popup';
import Burger from './burger';

const RootStore = types.model('RootStore', {
  ingredientsStore: types.optional(Ingredients, {}),
  orderStore: types.optional(Order, {}),
  popupStore: types.optional(Popup, {}),
  burgerStore: types.optional(Burger, {}),
});

export default RootStore;
