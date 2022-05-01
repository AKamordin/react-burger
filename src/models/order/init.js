import { combine, guard } from 'effector-logger/macro'
import {$error, $loading, $name, $number, $total} from "./store"
import {makeOrderFx} from "./fx"
import {initDataOrder, makeOrder} from "./events"
import {BUN} from "../../utils/constants";
import {$bun, $ingredients} from "../burger/store";

const calcTotal = (ingredients) => {
  if (!ingredients) {
    return 0
  }
  return ingredients.reduce((acc, cur) => acc + (cur.type === BUN.key ? 2 : 1) * cur.price, 0)
}

$number
  .on(makeOrderFx.doneData, (_, response) => response.order.number)
  .reset(initDataOrder)

$name
  .on(makeOrderFx.doneData, (_, response) => response.name)
  .reset(initDataOrder)

$loading
  .on(makeOrderFx.pending, (_, pending) => pending)
  .on(makeOrderFx.fail, () => false)
  .on(makeOrderFx.doneData, (_, response) => !response.success)
  .reset(initDataOrder)

$error
  .on(makeOrderFx.fail, (_, { error }) => error.message)
  .on(makeOrderFx.failData, (_, response) => !response.success ? response.message : null)
  .reset(initDataOrder)

const $burger = combine({$bun, $ingredients}, ({$bun, $ingredients}) => $bun ? [$bun, ...$ingredients] : [...$ingredients])

$total
  .on($burger, (_, data) => calcTotal(data))

guard({
  source: makeOrder,
  filter: data => data.length > 0,
  target: makeOrderFx
})
