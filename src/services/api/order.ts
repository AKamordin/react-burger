import {BASE_API_URL} from "../../utils/constants";
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError
} from "@reduxjs/toolkit/dist/query/react";
import {getDefaultHeaders} from "./index";
import {IResponse, RootState} from "../types";
import {IMakeOrderResponse} from "../types/order";
import {logoutSuccess, updateToken} from "../actions/auth";
import {IAuthResponse} from "../types/auth";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_API_URL,
  prepareHeaders: (headers, {getState}) => {
    const accessToken: string | undefined = (getState() as RootState).auth.accessToken
    return getDefaultHeaders(headers, accessToken)
  },
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  const refreshToken = (api.getState() as RootState).auth.refreshToken
  let result = await baseQuery(args, api, extraOptions)
  if (refreshToken && result.error && (result.error.status === 401 || (result.error.status === 403 && (result.error.data as IResponse).message === 'jwt expired'))) {
    const refreshResult = await baseQuery({
      url: `/token`,
      method: 'POST',
      body: {
        token: refreshToken,
      }
    }, api, extraOptions)
    if (refreshResult.data) {
      api.dispatch(updateToken(refreshResult.data as IAuthResponse))
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logoutSuccess())
    }
  }
  return result
}

export const orderAPI = createApi({
  reducerPath: 'orderAPI',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Order'],
  endpoints: (build) => ({
    makeOrder: build.mutation<IMakeOrderResponse, ReadonlyArray<string>>({
      query: (ids) => ({
        url: `/orders`,
        method: 'POST',
        body: {ingredients: ids}
      }),
      invalidatesTags: () => ['Order']
    }),
  })
})
