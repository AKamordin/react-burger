import {IResponse} from "./index";

export interface IOrder {
  ingredients: Array<string>;
  _id:         string;
  status:      string;
  name:        string;
  number:      number;
  createdAt:   string;
  updatedAt:   string;
}

export interface IOrders {
  orders:     Array<IOrder>;
  total:      number;
  totalToday: number;
}

export interface IOrdersResponse extends IResponse, IOrders {}
