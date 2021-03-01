import {
  getByEmail as getUserByEmail,
  comparePassword as compareUserPassword,
} from "../services/user";
import { generateToken } from "../utils/jwt";
import Unauthorized from "../errors/Unauthorized";

export const login = async (email, password) => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Unauthorized("Incorrect email or password");
  }

  const matchPassword = await compareUserPassword(password, user);
  if (!matchPassword) {
    throw new Unauthorized("Incorrect email or password");
  }

  const { id, name, roleId } = user;
  const authTokenPayload = { id, name, roleId };
  const authToken = generateToken(authTokenPayload);

  return {
    user: authTokenPayload,
    token: authToken,
  };
};
