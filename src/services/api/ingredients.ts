import {BASE_API_URL} from "../../utils/constants";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {getDefaultHeaders} from "./index";
import {IIngredientsResponse} from "../types/ingredients";

export const ingredientsAPI = createApi({
  reducerPath: 'ingredientsAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
    prepareHeaders: (headers) => getDefaultHeaders(headers),
  }),
  tagTypes: ['Ingredients'],
  endpoints: (build) => ({
    getIngredients: build.query<IIngredientsResponse, void>({
      query: () => ({
        url: `/ingredients`,
      }),
      providesTags: () => ['Ingredients']
    }),
  })
})
