import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {WSS_ORDERS_ALL} from "../../utils/constants";
import {setData} from "../slices/orders";

export const ordersAPI = createApi({
  reducerPath: 'ordersAPI',
  endpoints: (build) => ({
    getOrders: build.query({
      queryFn: () => ({ data: {} }),
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }
      ) {
        const ws = new WebSocket(WSS_ORDERS_ALL)
        try {
          await cacheDataLoaded
          const listener = event => {
            const data = JSON.parse(event.data)
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
