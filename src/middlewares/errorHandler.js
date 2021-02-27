/* eslint-disable no-unused-vars */
import { errorResponse } from "../utils/response";
import BaseError from "../errors/BaseError";

export default async (err, _req, res, _next) => {
  const isOperational = err instanceof BaseError ? err.isOperational : false;

  if (isOperational) {
    const { httpCode, message } = err;

    return errorResponse(res, httpCode, message);
  }

  console.error(err);

  return errorResponse(res);
};
