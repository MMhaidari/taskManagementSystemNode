import CustomError from "./custom.error";

class DatabaseConnectionError extends CustomError {
  statusCode = 500;

  constructor() {
    super("Error connecting to database");

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: "Failed to connect to the database" }];
  }
}

export default DatabaseConnectionError;