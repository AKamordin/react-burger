import { createAction } from "@reduxjs/toolkit";
import {IAuthResponse} from "../types/auth";

export const logoutSuccess = createAction("auth/logoutSuccess")
export const updateToken = createAction<IAuthResponse>("auth/updateToken")
