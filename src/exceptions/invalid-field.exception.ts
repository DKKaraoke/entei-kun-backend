/**
 * invalid-field.exception.ts
 * @author soltia48
 * @date 2022-10-03
 */

import { BadRequestException } from "@nestjs/common";

/**
 * Invalid field exception
 */
export class InvalidFieldException extends BadRequestException {
  /**
   * Constructor
   * @param field Field
   * @param reason Reason
   */
  constructor(field: string, reason: string) {
    super({ errors: [{ field, reason }] });
  }
}
