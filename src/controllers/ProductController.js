import { StatusCodes } from "http-status-codes";
import {
  getAll,
  create,
  get,
  update,
  updateQuantity,
  updateFile,
  destroy,
} from "../services/product";

class ProductController {
  async index(req, res) {
    const page = parseInt(req.query?.page) > 0 ? parseInt(req.query.page) : 1;
    const filters = req.query;

    const response = await getAll(page, filters);

    return res.status(StatusCodes.OK).json(response);
  }

  async store(req, res) {
    const { body: data, file } = req;

    const product = await create(data, file);

    return res.status(StatusCodes.OK).json(product);
  }

  async show(req, res) {
    const { id } = req.params;

    const product = await get(id);

    return res.status(StatusCodes.OK).json(product);
  }

  async update(req, res) {
    const { id } = req.params;
    const data = req.body;

    await update(id, data);

    return res.status(StatusCodes.OK).end();
  }

  async updateQuantity(req, res) {
    const { id } = req.params;
    const { quantity } = req.body;

    await updateQuantity(id, quantity);

    return res.status(StatusCodes.OK).end();
  }

  async updateFile(req, res) {
    const { id } = req.params;
    const { file } = req;

    await updateFile(id, file);

    return res.status(StatusCodes.OK).end();
  }

  async destroy(req, res) {
    const { id } = req.params;

    await destroy(id);

    return res.status(StatusCodes.OK).end();
  }
}

export default new ProductController();
