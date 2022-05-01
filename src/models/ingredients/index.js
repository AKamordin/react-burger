import {$data, $error, $loading, $selected} from "./store";
import {loadIngredients, setSelectedIngredients} from "./events";

export const modelIngredients = {
  $data,
  $error,
  $loading,
  $selected,
  loadIngredients,
  setSelectedIngredients,
}
