import {IIngredient} from "./ingredients";

export interface IBurger {
  bun: IIngredient | null;
  ingredients: Array<IIngredient>;
}

export interface IIndexedIngredient {
  index:      number;
  ingredient: IIngredient;
}
