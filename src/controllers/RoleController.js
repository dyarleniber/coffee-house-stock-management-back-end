import { StatusCodes } from "http-status-codes";

class RoleController {
  async index(req, res) {
    return res.status(StatusCodes.OK).end();
  }
}

export default new RoleController();
