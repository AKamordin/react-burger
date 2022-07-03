import store from "../store";

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export interface IResponse {
  success?: boolean;
  message?: string;
  originalStatus?: number;
}

export interface IIndexRange {
  fromIndex: number;
  toIndex:   number;
}

export type TLocationState = {
  pathname: string;
  state: {
    background: string;
    from: string;
  }
}
