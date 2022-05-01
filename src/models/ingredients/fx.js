import {createEffect} from "effector-logger/macro";
import api from "../../api/api";

export const loadIngredientsFx = createEffect(() => api.doAsyncGetRequest('ingredients'));
