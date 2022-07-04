import {BASE_API_URL} from "../../utils/constants";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {getDefaultHeaders} from "./index";
import {IResponse} from "../types";

export const passAPI = createApi({
  reducerPath: 'passAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
    prepareHeaders: (headers) => getDefaultHeaders(headers),
  }),
  endpoints: (build) => ({
    forgotPassword: build.mutation<IResponse, string>({
      query: (email) => ({
        url: `/password-reset`,
        method: 'POST',
        body: {
          email: email,
        }
      }),
    }),
    resetPassword: build.mutation<IResponse, {password: string, token: string}>({
      query: ({password, token}) => ({
        url: `/password-reset/reset`,
        method: 'POST',
        body: {
          password: password,
          token: token,
        }
      }),
    }),
  })
})
