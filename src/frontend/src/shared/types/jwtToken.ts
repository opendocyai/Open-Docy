export interface JwtPayload {
  exp: number
  iat: number
  [key: string]: any
}
