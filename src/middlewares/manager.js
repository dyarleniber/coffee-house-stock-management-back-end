import { verifyToken } from "../utils/jwt";
import { MANAGER_ROLE } from "../constants/role";
import Unauthorized from "../errors/Unauthorized";
import Forbidden from "../errors/Forbidden";

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Unauthorized("Token not provided");
  }

  const [, authToken] = authHeader.split(" ");

  try {
    const tokenPayload = await verifyToken(authToken);
    if (tokenPayload.roleId != MANAGER_ROLE) {
      throw new Forbidden();
    }

    return next();
  } catch (err) {
    if (err instanceof Forbidden) {
      throw new Forbidden();
    }

    throw new Unauthorized("Invalid token");
  }
};
