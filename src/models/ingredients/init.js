import { forward } from 'effector-logger/macro'
import {$data, $error, $loading, $selected} from "./store"
import {loadIngredientsFx} from "./fx"
import {loadIngredients, setSelectedIngredients} from "./events"

$data
  .on(loadIngredientsFx.doneData, (_, response) => response.success ? response.data : [])

$loading
  .on(loadIngredientsFx.pending, (_, pending) => pending)
  .on(loadIngredientsFx.fail, () => false)
  .on(loadIngredientsFx.doneData, (_, response) => !response.success)

$error
  .on(loadIngredientsFx.fail, (_, { error }) => error.message)
  .on(loadIngredientsFx.doneData, (_, response) => !response.success ? response.message : null)

$selected
  .on(setSelectedIngredients, (_, selected) => selected)

forward({
  from: loadIngredients,
  to: loadIngredientsFx
});
