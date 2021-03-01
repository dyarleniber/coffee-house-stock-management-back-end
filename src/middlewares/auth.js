import { verifyToken } from "../utils/jwt";
import Unauthorized from "../errors/Unauthorized";

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Unauthorized("Token not provided");
  }

  const [, authToken] = authHeader.split(" ");

  try {
    await verifyToken(authToken);

    return next();
  } catch (err) {
    throw new Unauthorized("Invalid token");
  }
};
