import {
  getByEmail as getUserByEmail,
  comparePassword as compareUserPassword,
} from "../services/user";
import { generateToken } from "../utils/jwt";
import { sendCookie, clearCookie } from "../utils/cookie";
import Unauthorized from "../errors/Unauthorized";

export const login = async (email, password, res) => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Unauthorized("Incorrect email or password");
  }

  const matchPassword = await compareUserPassword(password, user);
  if (!matchPassword) {
    throw new Unauthorized("Incorrect email or password");
  }

  const { id, name, roleId } = user;
  const authToken = generateToken({ id, name, roleId });

  sendCookie("authToken", authToken, res);
};

export const logout = (res) => {
  clearCookie("authToken", res);
};
