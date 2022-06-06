import {deleteCookie, getCookie, setCookie} from "../../utils/cookie";
import {createSlice} from "@reduxjs/toolkit";
import {authAPI} from "../api/auth";
import {logoutSuccess, updateToken} from "../actions/auth";

const accessToken = getCookie("accessToken");
const refreshToken = getCookie("refreshToken");

const initialState = {
  user: {
    name: null,
    email: null,
  },
  accessToken: accessToken,
  refreshToken: refreshToken,
  error: null,
  isAuth: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(logoutSuccess, (state) => {
        state.user = {}
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
        setCookie("accessToken", state.accessToken);
        setCookie("refreshToken", state.refreshToken);
      })
      .addMatcher(authAPI.endpoints.getUser.matchFulfilled, (state, action) => {
        state.user = action.payload.success ? action.payload.user : {}
      })
      .addMatcher(authAPI.endpoints.getUser.matchRejected, (state, action) => {
        if (action.error.name !== "ConditionError") {
          state.user = {}
          state.accessToken = ''
          state.refreshToken = ''
          state.error = action.payload.success ? null : action.payload.message
          state.isAuth = false
          deleteCookie("accessToken");
          deleteCookie("refreshToken");
        }
      })
      .addMatcher(authAPI.endpoints.login.matchFulfilled, (state, action) => {
        state.user = action.payload.success ? action.payload.user : {}
        state.accessToken = action.payload.success ? action.payload.accessToken : null
        state.refreshToken = action.payload.success ? action.payload.refreshToken : null
        state.error = action.payload.success ? null : action.payload.message
        state.isAuth = action.payload.success
        setCookie("accessToken", state.accessToken);
        setCookie("refreshToken", state.refreshToken);
      })
      .addMatcher(authAPI.endpoints.logout.matchFulfilled, (state, action) => {
        state.user = {}
        state.accessToken = ''
        state.refreshToken = ''
        state.error = action.payload.success ? null : action.payload.message
        state.isAuth = false
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
      })
      .addMatcher(authAPI.endpoints.register.matchFulfilled, (state, action) => {
        state.user = action.payload.success ? action.payload.user : {}
        state.accessToken = action.payload.success ? action.payload.accessToken : null
        state.refreshToken = action.payload.success ? action.payload.refreshToken : null
        state.error = action.payload.success ? null : action.payload.message
        state.isAuth = action.payload.success
        setCookie("accessToken", state.accessToken);
        setCookie("refreshToken", state.refreshToken);
      })
      .addMatcher(authAPI.endpoints.register.matchRejected, (state, action) => {
        state.user = {}
        state.accessToken = ''
        state.refreshToken = ''
        state.error = action.payload.message ? action.payload.message : 'Статус: ' + action.payload.originalStatus + '. ' + action.error.message
      })
  },
})

export default authSlice.reducer;
