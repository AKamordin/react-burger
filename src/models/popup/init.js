import {$show, $type} from "./store"
import {setPopup, unsetPopup} from "./events"
import {makeOrderFx} from "../order/fx";
import {ORDER} from "../../utils/constants";

$show
  .on(setPopup, () => true)
  .on(makeOrderFx.doneData, () => true)
  .reset(unsetPopup)

$type
  .on(setPopup, (_, data) => data)
  .on(makeOrderFx.doneData, () => ORDER)
  .reset(unsetPopup)
