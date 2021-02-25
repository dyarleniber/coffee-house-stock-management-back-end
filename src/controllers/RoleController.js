import { StatusCodes } from "http-status-codes";
import { getAll } from "../services/role";

class RoleController {
  async index(req, res) {
    const filters = req.query;

    const roles = await getAll(filters);

    return res.status(StatusCodes.OK).json(roles);
  }
}

export default new RoleController();
