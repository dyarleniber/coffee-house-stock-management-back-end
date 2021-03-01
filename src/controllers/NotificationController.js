import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { getAll, destroy } from "../services/notification";
import { validationErrorResponse } from "../utils/response";
import { getAuthTokenPayload } from "../utils/auth";

class NotificationController {
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

    const authTokenPayload = await getAuthTokenPayload(req);

    const response = await getAll(page, authTokenPayload, filters);

    return res.status(StatusCodes.OK).json(response);
  }

  async destroy(req, res) {
    const { id } = req.params;

    const authTokenPayload = await getAuthTokenPayload(req);

    await destroy(id, authTokenPayload);

    return res.status(StatusCodes.OK).end();
  }
}

export default new NotificationController();
