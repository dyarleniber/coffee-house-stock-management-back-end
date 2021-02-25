import { StatusCodes } from "http-status-codes";
import BaseError from "../errors/BaseError";

// eslint-disable-next-line no-unused-vars
export default async (err, _req, res, _next) => {
  const isOperational = err instanceof BaseError ? err.isOperational : false;
  const statusCode = err instanceof BaseError ? err.httpCode : err.status;
  const { message } = err;

  if (isOperational) {
    return res.status(statusCode).json({
      errors: [message],
    });
  }

  console.error(message);

  return res.status(statusCode || StatusCodes.INTERNAL_SERVER_ERROR).end();
};
