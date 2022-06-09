import {AUTH_API_URL} from "../../utils/constants";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {getDefaultHeaders} from "./index";
import {logoutSuccess, updateToken} from "../actions/auth";

const baseQuery = fetchBaseQuery({
  baseUrl: AUTH_API_URL,
  prepareHeaders: (headers, {getState}) => {
    const accessToken = getState().auth.accessToken
    return getDefaultHeaders(headers, accessToken)
  },
})


const baseQueryWithReauth = async (args, api, extraOptions) => {
  const refreshToken = api.getState().auth.refreshToken
  let result = await baseQuery(args, api, extraOptions)
  if (refreshToken && result.error && (result.error.status === 401 || (result.error.status === 403 && result.error.data.message === 'jwt expired'))) {
    const refreshResult = await baseQuery({
      url: `/token`,
      method: 'POST',
      body: {
        token: refreshToken,
      }
    }, api, extraOptions)
    if (refreshResult.data) {
      api.dispatch(updateToken(refreshResult.data))
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logoutSuccess())
    }
  }
  return result
}

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getUser: build.query({
      query: () => ({
        url: `/user`,
        method: 'GET',
      }),
    }),
    updateUser: build.mutation({
      query: ({name, email}) => ({
        url: `/user`,
        method: 'PATCH',
        body: {
          name: name,
          email: email,
        }
      }),
    }),
    login: build.mutation({
      query: ({email, password}) => ({
        url: `/login`,
        method: 'POST',
        body: {
          email: email,
          password: password,
        }
      }),
    }),
    logout: build.mutation({
      query: (refreshToken) => ({
        url: `/logout`,
        method: 'POST',
        body: {
          token: refreshToken,
        }
      }),
    }),
    register: build.mutation({
      query: ({name, email, password}) => ({
        url: `/register`,
        method: 'POST',
        body: {
          name: name,
          email: email,
          password: password,
        }
      }),
    }),
  })
})
