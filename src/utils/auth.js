import { verifyToken } from "../utils/jwt";

export const getAuthTokenPayload = async (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return {};
  }

  const [, authToken] = authHeader.split(" ");

  try {
    const tokenPayload = await verifyToken(authToken);
    return tokenPayload;
  } catch (err) {
    return {};
  }
};
