import * as yup from "yup";
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
import { validationErrorResponse } from "../utils/response";
import { getImageValidation } from "../utils/validation";

class ProductController {
  async index(req, res) {
    const page = parseInt(req.query?.page) > 0 ? parseInt(req.query.page) : 1;
    const filters = req.query;

    const schema = yup.object().shape({
      search: yup.string(),
    });

    try {
      await schema.validate(filters || {});
    } catch (error) {
      return validationErrorResponse(res, error);
    }

    const response = await getAll(page, filters);

    return res.status(StatusCodes.OK).json(response);
  }

  async store(req, res) {
    const { body: data, file } = req;

    const schema = yup.object().shape({
      name: yup.string().required(),
      description: yup.string(),
      quantity: yup.number().required(),
      price: yup.number().required(),
      categoryId: yup.number().required(),
      file: getImageValidation().required("image is a required field"),
    });

    try {
      await schema.validate({ ...data, file } || {});
    } catch (error) {
      return validationErrorResponse(res, error);
    }

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

    const schema = yup.object().shape({
      name: yup.string(),
      description: yup.string(),
      quantity: yup.number(),
      price: yup.number(),
      categoryId: yup.number(),
    });

    try {
      await schema.validate(data || {});
    } catch (error) {
      return validationErrorResponse(res, error);
    }

    await update(id, data);

    return res.status(StatusCodes.OK).end();
  }

  async updateQuantity(req, res) {
    const { id } = req.params;
    const { quantity } = req.body;

    const schema = yup.object().shape({
      quantity: yup.number().required(),
    });

    try {
      await schema.validate({ quantity } || {});
    } catch (error) {
      return validationErrorResponse(res, error);
    }

    await updateQuantity(id, quantity);

    return res.status(StatusCodes.OK).end();
  }

  async updateFile(req, res) {
    const { id } = req.params;
    const { file } = req;

    const schema = yup.object().shape({
      file: getImageValidation().required("image is a required field"),
    });

    try {
      await schema.validate({ file } || {});
    } catch (error) {
      return validationErrorResponse(res, error);
    }

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
