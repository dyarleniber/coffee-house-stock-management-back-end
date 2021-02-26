import { StatusCodes } from "http-status-codes";
import { getAll, create, get, update, destroy } from "../services/category";

class CategoryController {
  async index(req, res) {
    const filters = req.query;

    const categories = await getAll(filters);

    return res.status(StatusCodes.OK).json(categories);
  }

  async store(req, res) {
    const data = req.body;

    const category = await create(data);

    return res.status(StatusCodes.OK).json(category);
  }

  async show(req, res) {
    const { id } = req.params;

    const category = await get(id);

    return res.status(StatusCodes.OK).json(category);
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

export default new CategoryController();
