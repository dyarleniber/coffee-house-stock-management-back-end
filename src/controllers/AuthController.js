import { StatusCodes } from "http-status-codes";

class AuthController {
  async login(req, res) {
    return res.status(StatusCodes.OK).end();
  }

  async logout(req, res) {
    return res.status(StatusCodes.OK).end();
  }
}

export default new AuthController();
