import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { getAll, create, get, update, destroy } from "../services/category";
import { validationErrorResponse } from "../utils/response";

class CategoryController {
  async index(req, res) {
    const filters = req.query;

    const schema = yup.object().shape({
      search: yup.string(),
    });

    try {
      await schema.validate(filters || {});
    } catch (error) {
      return validationErrorResponse(res, error);
    }

    const categories = await getAll(filters);

    return res.status(StatusCodes.OK).json(categories);
  }

  async store(req, res) {
    const data = req.body;

    const schema = yup.object().shape({
      name: yup.string().required(),
      maxQuantity: yup.number().required(),
    });

    try {
      await schema.validate(data || {});
    } catch (error) {
      return validationErrorResponse(res, error);
    }

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

    const schema = yup.object().shape({
      name: yup.string(),
      maxQuantity: yup.number(),
    });

    try {
      await schema.validate(data || {});
    } catch (error) {
      return validationErrorResponse(res, error);
    }

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
