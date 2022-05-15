import {BASE_API_URL} from "../../utils/constants";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {getDefaultHeaders} from "./index";

export const orderAPI = createApi({
  reducerPath: 'orderAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
    prepareHeaders: (headers) => getDefaultHeaders(headers),
  }),
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
