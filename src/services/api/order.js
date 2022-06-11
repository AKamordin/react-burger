import {BASE_API_URL} from "../../utils/constants";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {getDefaultHeaders} from "./index";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_API_URL,
  prepareHeaders: (headers, {getState}) => {
    const accessToken = getState().auth.accessToken
    return getDefaultHeaders(headers, accessToken)
  },
})


export const orderAPI = createApi({
  reducerPath: 'orderAPI',
  baseQuery: baseQuery,
  tagTypes: ['Order'],
  endpoints: (build) => ({
    makeOrder: build.mutation({
      query: (ids) => ({
        url: `/orders`,
        method: 'POST',
        body: {ingredients: ids}
      }),
      invalidatesTags: () => ['Order']
    }),
  })
})
