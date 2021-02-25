import { ReasonPhrases, StatusCodes } from "http-status-codes";
import BaseError from "./BaseError";

class Unauthorized extends BaseError {
  constructor(description) {
    const name = ReasonPhrases.UNAUTHORIZED;
    const httpCode = StatusCodes.UNAUTHORIZED;
    const isOperational = true;

    super(name, httpCode, description, isOperational);
  }
}

export default Unauthorized;
