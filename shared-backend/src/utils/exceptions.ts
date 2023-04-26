/*
 *
 * MIT License.
 *
 */
export class InvalidObjectException extends Error {
  constructor(message: string) {
    super(message);
  }

  static missingProperties(missingProperties: readonly string[]): InvalidObjectException {
    return new InvalidObjectException(
      `InvalidObjectException: Object is missing properties [${missingProperties.join(', ')}]`
    );
  }
}
