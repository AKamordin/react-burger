export const getDefaultHeaders = (headers, accessToken) => {
  headers.set("Accept", "application/json;charset=UTF-8")
  headers.set("Content-Type", "application/json;charset=UTF-8")
  if (accessToken) {
    headers.set("Authorization", accessToken)
  }
  return headers
}
