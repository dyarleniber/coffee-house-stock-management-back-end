import { StatusCodes } from "http-status-codes";

export const errorResponse = (res, statusCode, error) => {
  const status = statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const body = error && typeof error === "string" ? { errors: [error] } : error;

  if (body) {
    return res.status(status).json(body);
  }

  return res.status(status).end();
};

export const badRequestResponse = (res, error) => {
  const statusCode = StatusCodes.BAD_REQUEST;

  return errorResponse(res, statusCode, error);
};

export const validationErrorResponse = (res, error) => {
  const { errors, name, path, type, message } = error;

  return badRequestResponse(res, {
    errors,
    name,
    path,
    type,
    message,
  });
};
