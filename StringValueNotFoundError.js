/**
 * Error class for string value not found errors.
 * @class StringValueNotFoundError
 * @extends Error
 */
export class StringValueNotFoundError extends Error {
  constructor (message, ...args) {
    super(message, ...args)
  }
}
