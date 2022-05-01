import {createEffect} from "effector-logger/macro";
import api from "../../api/api";

export const makeOrderFx = createEffect(data => api.doAsyncPostRequest('orders', {ingredients: data}));
