/**
 * error-response.dto.ts
 * @author soltia48
 * @date 2022-10-03
 */

/**
 * Error
 */
export class ErrorResponseError {
  /**
   * Field name
   */
  field?: string;

  /**
   * Rule
   */
  rule?: string;

  /**
   * Reason
   */
  reason?: string;

  /**
   * Message
   */
  message?: string;
}

/**
 * Error response
 */
export class ErrorResponseDto {
  /**
   * Status code
   */
  statusCode!: number;

  /**
   * Status description
   */
  statusDescription!: string;

  /**
   * Errors
   */
  errors?: ErrorResponseError[];

  /**
   * Timestamp
   */
  timestamp!: string;
}
