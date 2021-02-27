import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { getAll } from "../services/role";
import { validationErrorResponse } from "../utils/response";

class RoleController {
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

    const roles = await getAll(filters);

    return res.status(StatusCodes.OK).json(roles);
  }
}

export default new RoleController();
