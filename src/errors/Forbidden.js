import { ReasonPhrases, StatusCodes } from "http-status-codes";
import BaseError from "./BaseError";

class Forbidden extends BaseError {
  constructor(description) {
    const name = ReasonPhrases.FORBIDDEN;
    const httpCode = StatusCodes.FORBIDDEN;
    const isOperational = true;

    super(name, httpCode, description, isOperational);
  }
}

export default Forbidden;
