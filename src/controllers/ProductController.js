import { StatusCodes } from "http-status-codes";

class ProductController {
  async index(req, res) {
    return res.status(StatusCodes.OK).end();
  }

  async store(req, res) {
    return res.status(StatusCodes.OK).end();
  }

  async show(req, res) {
    return res.status(StatusCodes.OK).end();
  }

  async update(req, res) {
    return res.status(StatusCodes.OK).end();
  }

  async updateQuantity(req, res) {
    return res.status(StatusCodes.OK).end();
  }

  async destroy(req, res) {
    return res.status(StatusCodes.OK).end();
  }
}

export default new ProductController();
