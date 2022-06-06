import { createAction } from "@reduxjs/toolkit"
export const logoutSuccess = createAction("auth/logoutSuccess")
export const updateToken = createAction("auth/updateToken");
