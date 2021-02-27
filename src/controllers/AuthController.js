import * as yup from "yup";
import { StatusCodes } from "http-status-codes";
import { login, logout } from "../services/auth";
import { validationErrorResponse } from "../utils/response";

class AuthController {
  async login(req, res) {
    const data = req.body;

    const schema = yup.object().shape({
      email: yup.string().required().email(),
      password: yup.string().required(),
    });

    try {
      await schema.validate(data || {});
    } catch (error) {
      return validationErrorResponse(res, error);
    }

    const { email, password } = data;

    await login(email, password, res);

    return res.status(StatusCodes.OK).end();
  }

  async logout(req, res) {
    logout(res);

    return res.status(StatusCodes.OK).end();
  }
}

export default new AuthController();
