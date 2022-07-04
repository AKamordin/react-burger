import {RootState} from "../types";

export const accessTokenSelector = (state: RootState) => state.auth.accessToken
export const refreshTokenSelector = (state: RootState) => state.auth.refreshToken
export const nameUserSelector = (state: RootState) => state.auth.user?.name
export const emailUserSelector = (state: RootState) => state.auth.user?.email
export const isAuthSelector = (state: RootState) => state.auth.isAuth
