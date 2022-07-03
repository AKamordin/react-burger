import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {WSS_ORDERS} from "../../utils/constants";
import {setData} from "../slices/history";
import {RootState} from "../types";
import {IOrdersResponse} from "../types/orders";

export const historyAPI = createApi({
  reducerPath: 'historyAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    credentials: 'include',
  }),
  endpoints: (build) => ({
    getOrders: build.query<IOrdersResponse, void>({
      queryFn: () => ({ data: {} as IOrdersResponse}),
      async onCacheEntryAdded(
        _arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch, getState }
      ) {
        const accessToken: string | undefined = (getState() as RootState).auth.accessToken
        if (!accessToken) {
          return
        }
        const ws = new WebSocket(`${WSS_ORDERS}?token=${accessToken.replace('Bearer ', '')}`)
        try {
          await cacheDataLoaded
          const listener = (event: MessageEvent) => {
            const data: IOrdersResponse = JSON.parse(event.data);
            updateCachedData(draft => {
              Object.assign(draft, data);
            })
            dispatch(setData(data))
          }
          ws.addEventListener('message', listener)
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        await cacheEntryRemoved
        ws.close()
      },
    }),
  })
})
