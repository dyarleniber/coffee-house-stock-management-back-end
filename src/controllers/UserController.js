import { StatusCodes } from "http-status-codes";
import { getAll, create, get, update, destroy } from "../services/user";

class UserController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const filters = req.query;

    const response = await getAll(page, filters);

    return res.status(StatusCodes.OK).json(response);
  }

  async store(req, res) {
    const data = req.body;

    const user = await create(data);

    return res.status(StatusCodes.OK).json(user);
  }

  async show(req, res) {
    const { id } = req.params;

    const user = await get(id);

    return res.status(StatusCodes.OK).json(user);
  }

  async update(req, res) {
    const { id } = req.params;
    const data = req.body;

    await update(id, data);

    return res.status(StatusCodes.OK).end();
  }

  async destroy(req, res) {
    const { id } = req.params;

    await destroy(id);

    return res.status(StatusCodes.OK).end();
  }
}

export default new UserController();
