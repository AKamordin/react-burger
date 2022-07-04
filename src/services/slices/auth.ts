import {deleteCookie, getCookie, setCookie} from "../../utils/cookie";
import {createSlice} from "@reduxjs/toolkit";
import {authAPI} from "../api/auth";
import {logoutSuccess, updateToken} from "../actions/auth";
import {IUser, IUserAuth} from "../types/auth";
import {IResponse} from "../types";

const accessToken = getCookie("accessToken");
const refreshToken = getCookie("refreshToken");

const initialUser: IUser = {
  name: null,
  email: null,
}

const initialState: IUserAuth = {
  user: initialUser,
  accessToken: accessToken,
  refreshToken: refreshToken,
  error: null,
  isAuth: false,
}

const authSlice = createSlice({
  reducers: {},
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(logoutSuccess, (state) => {
        state.user = initialUser
        state.accessToken = ''
        state.refreshToken = ''
        state.error = null
        state.isAuth = false
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
      })
      .addCase(updateToken, (state, action) => {
        state.accessToken = action.payload.success ? action.payload.accessToken : ''
        state.refreshToken = action.payload.success ? action.payload.refreshToken : ''
        if (state.accessToken) {
          setCookie("accessToken", state.accessToken);
        }
        if (state.refreshToken) {
          setCookie("refreshToken", state.refreshToken);
        }
      })
      .addMatcher(authAPI.endpoints.getUser.matchFulfilled, (state, action) => {
        state.isAuth = true
        state.user = action.payload.success ? action.payload.user : initialUser
      })
      .addMatcher(authAPI.endpoints.getUser.matchRejected, (state, action) => {
        if (action.error?.name !== "ConditionError") {
          state.user = initialUser
          state.accessToken = ''
          state.refreshToken = ''
          state.error = (action.payload?.data as IResponse).success ? null : (action.payload?.data as IResponse).message
          state.isAuth = false
          deleteCookie("accessToken");
          deleteCookie("refreshToken");
        }
      })
      .addMatcher(authAPI.endpoints.login.matchFulfilled, (state, action) => {
        state.user = action.payload.success ? action.payload.user : initialUser
        state.accessToken = action.payload.success ? action.payload.accessToken : ''
        state.refreshToken = action.payload.success ? action.payload.refreshToken : ''
        state.error = action.payload.success ? null : action.payload.message
        state.isAuth = action.payload.success ? action.payload.success : false
        if (state.accessToken) {
          setCookie("accessToken", state.accessToken);
        }
        if (state.refreshToken) {
          setCookie("refreshToken", state.refreshToken);
        }
      })
      .addMatcher(authAPI.endpoints.login.matchRejected, (state, action) => {
        const message = (action.payload?.data as IResponse).message
        state.error = message ? message : 'Статус: ' + (action.payload as IResponse).originalStatus + '. ' + action.error.message
      })
      .addMatcher(authAPI.endpoints.logout.matchFulfilled, (state, action) => {
        state.user = initialUser
        state.accessToken = ''
        state.refreshToken = ''
        state.error = action.payload.success ? null : action.payload.message
        state.isAuth = false
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
      })
      .addMatcher(authAPI.endpoints.updateUser.matchFulfilled, (state, action) => {
        state.user = action.payload.success ? action.payload.user : initialUser
        state.error = action.payload.success ? null : action.payload.message
      })
      .addMatcher(authAPI.endpoints.register.matchFulfilled, (state, action) => {
        state.user = action.payload.success ? action.payload.user : initialUser
        state.accessToken = action.payload.success ? action.payload.accessToken : ''
        state.refreshToken = action.payload.success ? action.payload.refreshToken : ''
        state.error = action.payload.success ? null : action.payload.message
        state.isAuth = action.payload.success ? action.payload.success : false
        if (state.accessToken) {
          setCookie("accessToken", state.accessToken);
        }
        if (state.refreshToken) {
          setCookie("refreshToken", state.refreshToken);
        }
      })
      .addMatcher(authAPI.endpoints.register.matchRejected, (state, action) => {
        state.user = initialUser
        state.accessToken = ''
        state.refreshToken = ''
        const message = (action.payload?.data as IResponse).message
        state.error = message ? message : 'Статус: ' + (action.payload as IResponse).originalStatus + '. ' + action.error.message
      })
  }
})

export default authSlice.reducer;
