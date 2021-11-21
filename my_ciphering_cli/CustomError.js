class CustomError extends Error {
    constructor(message) {
      super(`Error: ${ message }`);
      this.isCustom = true;
    }
}

export default CustomError;