/* eslint-disable no-unused-vars */
import { StatusCodes } from "http-status-codes";
import BaseError from "../errors/BaseError";

export default async (err, _req, res, _next) => {
  const isOperational = err instanceof BaseError ? err.isOperational : false;

  if (isOperational) {
    const { httpCode, message } = err;
    return res.status(httpCode).json({ errors: [message] });
  }

  console.error(err);

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
};
