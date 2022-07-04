import {ReactElement} from "react";
import {IIngredient} from "./ingredients";
import {IOrder} from "./orders";

export type TRequireNoAuthRoute = {
  isAuth?: boolean;
  redirectTo: string;
  redirectOnlyFrom?: string;
}

export type TRequireAuthRoute = Omit<TRequireNoAuthRoute, 'redirectOnlyFrom'> & {children: ReactElement<any, any> | null}

export type TAppHeaderNavLink = {
  to: string;
  text?: string;
  active?: boolean;
  profile?: boolean;
}

export type TBurgerIngredientGroup = {
  title: string;
  ingredients: Array<IIngredient>;
}

export type TBurgerItem = {
  ingredient : IIngredient;
}

export type TBurgerIngredientsItem = TBurgerItem & {count: number | null;}

export type TBurgerConstructorItem = TBurgerItem & {index: number}

export type TOrderItem = {
  order : IOrder;
  isHistory?: boolean;
}

export type TOrderInfo = Omit<TOrderItem, 'isHistory'>

export type TOrderList = {
  orders: Array<IOrder>;
}

export type TOrderNumberList = TOrderList & {title: string, isDone?: boolean}
