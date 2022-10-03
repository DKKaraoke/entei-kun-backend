/**
 * pagination.dto.ts
 * @author soltia48
 * @date 2022-10-03
 */

import { ApiPropertyOptional } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";
import { IsInt, IsOptional, Max, Min } from "class-validator";

/**
 * Pagination DTO
 */
export class PaginationDto {
  /**
   * Start
   */
  @Expose()
  @Transform((params) => parseInt(params.value, 10))
  @IsOptional()
  @IsInt({ message: "The starting position of pagination must be an integer." })
  @Min(0, {
    message: (args) =>
      `The start of pagination must be greater than or equal to ${args.constraints[0]}.`,
  })
  @ApiPropertyOptional({
    title: "Start",
    minimum: 0,
    default: 0,
  })
  readonly start: number = 0;

  @Expose()
  @Transform((params) => parseInt(params.value, 10))
  @IsOptional()
  @IsInt({ message: "The maximum number of pagination acquisitions must be an integer." })
  @Min(0, {
    message: (args) =>
      `The upper limit for obtaining pagination must be greater than or equal to ${args.constraints[0]}.`,
  })
  @Max(255, {
    message: (args) =>
      `The upper limit of pagination acquisition must be less than or equal to ${args.constraints[0]}.`,
  })
  @ApiPropertyOptional({
    title: "Limit",
    minimum: 0,
    maximum: 255,
    default: 25,
  })
  readonly limit: number = 25;
}
