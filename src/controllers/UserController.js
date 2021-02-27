import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { getAll, create, get, update, destroy } from "../services/user";
import { validationErrorResponse } from "../utils/response";
import { ROLES } from "../constants/role";

class UserController {
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
    const data = req.body;

    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().required().email(),
      password: yup.string().required().min(6),
      roleId: yup.number().required().oneOf(ROLES),
    });

    try {
      await schema.validate(data || {});
    } catch (error) {
      return validationErrorResponse(res, error);
    }

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

    const schema = yup.object().shape({
      name: yup.string(),
      email: yup.string().email(),
      password: yup.string().min(6),
      roleId: yup.number().oneOf(ROLES),
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

export default new UserController();
