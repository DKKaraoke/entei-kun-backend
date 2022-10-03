/**
 * pagination-with-query.dto.ts
 * @author soltia48
 * @date 2022-10-03
 */

import { ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

import { PaginationDto } from "./pagination.dto";

/**
 * Pagination with query DTO
 */
export class PaginationWithQueryDto extends PaginationDto {
  /**
   * Query string
   */
  @Expose()
  @IsOptional()
  @IsString({ message: "The search query must be a string." })
  @ApiPropertyOptional({
    title: "Query string",
    default: "",
  })
  readonly q: string = "";

  /**
   * Ordering
   */
  @Expose()
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "Ordering",
    default: "",
  })
  readonly ordering: string = "";
}
