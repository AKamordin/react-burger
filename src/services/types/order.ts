import {IResponse} from "./index";

export type TOrderStatus = {
  key:   string;
  name:  string;
  value: string;
}

export interface IMakeOrder {
  name:    string | null;
  number:  string | null;
  status:  TOrderStatus;
  loading: boolean;
  error?:  string | null;
}

export interface IMakeOrderResponse extends IResponse {
  name: string;
  order: {
    number: string
  };
}
