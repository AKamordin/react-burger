import {flow, types} from "mobx-state-tree";
import api from "../api/api";

export const Ingredient = types.model('Ingredient', {
  _id: types.identifier,
  __v: types.maybe(types.integer),
  calories: types.maybe(types.integer),
  carbohydrates: types.maybe(types.integer),
  fat: types.maybe(types.integer),
  image: types.maybe(types.string),
  image_large: types.maybe(types.string),
  image_mobile: types.maybe(types.string),
  name: types.maybe(types.string),
  price: types.maybe(types.integer),
  proteins: types.maybe(types.integer),
  type: types.maybe(types.string),
  uuid: types.maybe(types.string),
});

const Ingredients = types.model('Ingredients', {
  data: types.optional(types.array(Ingredient), []),
  loading: false,
  error: types.maybeNull(types.string),
  selected: types.maybe(Ingredient)
}).actions(self => {
  return {
    getIngredients: flow(function* () {
      self.loading = true
      yield api.doAsyncGetRequest(
        'ingredients',
        (data) => {
          if (data.success) {
            self.getSuccess(data.data)
          } else {
            self.getError(data.message)
          }
        },
        (err) => {
          self.getError(err.message)
        }
      )
    }),
    getSuccess(data) {
      self.data = data
      self.error = null
      self.loading = false
    },
    getError(message) {
      self.error = message
      self.loading = false
    },
    setSelectedIngredient(ingredient) {
      self.selected = ingredient
    },
    afterCreate() {
      self.getIngredients()
    }
  }
})

export default Ingredients;
