import CustomError from "./custom.error";

class NotAuthorizedError extends CustomError {
  statusCode = 401;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

export default NotAuthorizedError;