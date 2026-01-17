export class ApiError extends Error {
  constructor(exceptionCode: string) {
    super(exceptionCode);
    this.name = 'ApiError';
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
