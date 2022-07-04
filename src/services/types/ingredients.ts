import {IResponse} from "./index";

export enum EIngredientType {
  bun   = 'bun',
  sauce = 'sauce',
  main  = 'main'
}

export interface IIngredient {
  _id:            string;
  name:           string;
  type:           EIngredientType;
  proteins:       number;
  fat:            number;
  carbohydrates:  number;
  calories:       number;
  price:          number;
  image:          string;
  image_mobile:   string;
  image_large:    string;
  __v:            number;
  uuid?:          string;
}

export interface IIngredientCount extends IIngredient{
  count: number;
}

export interface IIngredients {
  ingredients: Array<IIngredient>,
  loading:     boolean,
  error?:      string | null,
}

export interface IIngredientsResponse extends IResponse {
  data: Array<IIngredient>;
}
