import { verifyToken } from "../utils/jwt";
import Unauthorized from "../errors/Unauthorized";

export default async (req, res, next) => {
  const { authToken } = req.cookies || {};

  if (!authToken) {
    throw new Unauthorized("Token not provided");
  }

  try {
    await verifyToken(authToken);

    return next();
  } catch (err) {
    throw new Unauthorized("Invalid token");
  }
};
