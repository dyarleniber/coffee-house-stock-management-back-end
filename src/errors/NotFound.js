import { ReasonPhrases, StatusCodes } from "http-status-codes";
import BaseError from "./BaseError";

class NotFound extends BaseError {
  constructor(description) {
    const name = ReasonPhrases.NOT_FOUND;
    const httpCode = StatusCodes.NOT_FOUND;
    const isOperational = true;

    super(name, httpCode, description, isOperational);
  }
}

export default NotFound;
