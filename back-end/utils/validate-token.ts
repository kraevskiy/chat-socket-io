import jwt from "jsonwebtoken";

export const validateToken = function (token: string): Object {
  try {
    const jwtSecret: any = process.env.JWT_SECRET;
    return jwt.verify(token, jwtSecret);
  } catch (e) {
    throw new Error('Invalid token');
  }};
