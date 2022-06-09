export const accessTokenSelector = ({auth}) => auth.accessToken
export const refreshTokenSelector = ({auth}) => auth.refreshToken
export const nameUserSelector = ({auth}) => auth.user.name
export const emailUserSelector = ({auth}) => auth.user.email
export const isAuthSelector = ({auth}) => auth.isAuth
