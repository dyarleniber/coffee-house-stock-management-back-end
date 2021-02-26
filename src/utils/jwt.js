import jwt from "jsonwebtoken";
import { promisify } from "util";
import jwtConfig from "../config/jwt";

export const generateToken = (payload) => {
  const { secret, expiresIn } = jwtConfig;

  return jwt.sign(payload, secret, { expiresIn });
};

export const verifyToken = async (token) => {
  const { secret } = jwtConfig;
  const decoded = await promisify(jwt.verify)(token, secret);

  return decoded;
};
