/**
 * validation-exception-factory.ts
 * @author soltia48
 * @date 2022-10-03
 */

import { ValidationPipe as ValidationPipeBase, ValidationPipeOptions } from "@nestjs/common";
import { HttpErrorByCode } from "@nestjs/common/utils/http-error-by-code.util";
import { ValidationError } from "class-validator";

import { ErrorResponseError } from "~/dtos/error-response.dto";

/**
 * Validation pipe
 */
export class ValidationPipe extends ValidationPipeBase {
  /**
   * Constructor
   * @param options Options
   */
  constructor(options: ValidationPipeOptions) {
    super(options);
  }

  /**
   * Error detail by validation errors
   * @param validationErrors Validation errors
   * @return Error detail
   */
  private errorDetailByValidationErrors(validationErrors: ValidationError[]) {
    const flatted = validationErrors.flatMap((validationError) =>
      this.mapChildrenToValidationErrors(validationError)
    );
    const errors: ErrorResponseError[] = [];
    for (const validationError of flatted) {
      if (!validationError.constraints) {
        continue;
      }

      for (const constraint of Object.entries(validationError.constraints)) {
        errors.push({
          field: validationError.property,
          rule: constraint[0],
          message: constraint[1],
        });
      }
    }
    return errors;
  }

  /**
   * Create exception factory
   * @return Exception factory
   */
  public createExceptionFactory() {
    return (validationErrors: ValidationError[] = []) => {
      if (this.isDetailedOutputDisabled) {
        return new HttpErrorByCode[this.errorHttpStatusCode]();
      }
      const errors = this.errorDetailByValidationErrors(validationErrors);
      return new HttpErrorByCode[this.errorHttpStatusCode]({ errors });
    };
  }
}
