import {AUTH_API_URL} from "../../utils/constants";
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError
} from "@reduxjs/toolkit/dist/query/react";
import {getDefaultHeaders} from "./index";
import {logoutSuccess, updateToken} from "../actions/auth";
import {IResponse, RootState} from "../types";
import {
  IAuthResponse,
  IRegisterRequest,
  IUserAuthResponse,
  IUserResponse, TLoginRequest, TUpdateUserRequest
} from "../types/auth";

const baseQuery = fetchBaseQuery({
  baseUrl: AUTH_API_URL,
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

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getUser: build.query<IUserResponse, void>({
      query: () => ({
        url: `/user`,
        method: 'GET',
      }),
    }),
    updateUser: build.mutation<IUserResponse, TUpdateUserRequest>({
      query: ({name, email}) => ({
        url: `/user`,
        method: 'PATCH',
        body: {
          name: name,
          email: email,
        }
      }),
    }),
    login: build.mutation<IUserAuthResponse, TLoginRequest>({
      query: ({email, password}) => ({
        url: `/login`,
        method: 'POST',
        body: {
          email: email,
          password: password,
        }
      }),
    }),
    logout: build.mutation<IResponse, string>({
      query: (refreshToken) => ({
        url: `/logout`,
        method: 'POST',
        body: {
          token: refreshToken,
        }
      }),
    }),
    register: build.mutation<IUserAuthResponse, IRegisterRequest>({
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
