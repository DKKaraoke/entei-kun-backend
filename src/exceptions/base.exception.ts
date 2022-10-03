/**
 * base.exception.ts
 * @author soltia48
 * @date 2022-10-03
 */

/**
 * Base exception
 */
export class BaseException extends Error {
  /**
   * Constructor
   * @param message Message
   */
  constructor(message?: string) {
    super(message);

    Object.defineProperty(this, "name", {
      configurable: true,
      enumerable: false,
      value: new.target.name,
      writable: true,
    });
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, new.target.prototype);
    }
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, new.target);
    }
  }
}
