class AppError extends Error {
  /**
   *
   * @param message
   * @param statusCode
   */
  constructor(message, statusCode) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

export default AppError;
