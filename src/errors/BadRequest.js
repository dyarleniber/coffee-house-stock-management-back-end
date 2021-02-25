import { ReasonPhrases, StatusCodes } from "http-status-codes";
import BaseError from "./BaseError";

class BadRequest extends BaseError {
  constructor(description) {
    const name = ReasonPhrases.BAD_REQUEST;
    const httpCode = StatusCodes.BAD_REQUEST;
    const isOperational = true;

    super(name, httpCode, description, isOperational);
  }
}

export default BadRequest;
