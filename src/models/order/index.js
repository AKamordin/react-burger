import {$error, $loading, $name, $number, $status, $total} from "./store";
import {initDataOrder, makeOrder} from "./events";

export const modelOrder = {
  $name,
  $number,
  $status,
  $total,
  $loading,
  $error,
  initDataOrder,
  makeOrder
}
