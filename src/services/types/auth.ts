import {IResponse} from "./index";

export interface IUser {
  email: string | null;
  name:  string | null;
}

export interface IAuth {
  accessToken: string | undefined;
  refreshToken: string | undefined;
}

export interface IUserAuth extends IAuth {
  user: IUser;
  error?: string | null;
  isAuth: boolean;
}

export interface IAuthResponse extends IResponse, IAuth {}

export interface IUserResponse extends IResponse {
  user: IUser;
}

export interface IUserAuthResponse extends IUserResponse, IAuth {}

export interface IRegisterRequest {
  name:     string | boolean;
  email:    string | boolean;
  password: string | boolean;
}

export type TUpdateUserRequest = Omit<IRegisterRequest, 'password'>

export type TLoginRequest = Omit<IRegisterRequest, 'name'>

