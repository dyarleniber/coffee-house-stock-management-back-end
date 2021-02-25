class BaseError extends Error {
  constructor(name, httpCode, description, isOperational) {
    super(description);

    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}

export default BaseError;
