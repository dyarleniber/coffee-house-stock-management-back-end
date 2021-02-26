import { StatusCodes } from "http-status-codes";
import { login, logout } from "../services/auth";

class AuthController {
  async login(req, res) {
    const { email, password } = req.body;

    await login(email, password, res);

    return res.status(StatusCodes.OK).end();
  }

  async logout(req, res) {
    logout(res);

    return res.status(StatusCodes.OK).end();
  }
}

export default new AuthController();
