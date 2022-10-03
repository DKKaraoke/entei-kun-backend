/**
 * app.dto.ts
 * @author soltia48
 * @date 2022-10-03
 */

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";
import { IsBoolean, IsInt, IsOptional, IsString, Max, Min } from "class-validator";

import { DamPreciseScoringTotalScoreType } from "~/types/dam-precise-scoring-total-score-type";

/**
 * Get DAM precise scoring total score predictions DTO
 */
export class GetDamPreciseScoringTotalScorePredictionsDto {
  /**
   * Start time
   */
  @Expose()
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "Start time",
    example: "2021-01-01 00:00:00",
  })
  readonly startTime?: string;

  /**
   * Time limit
   */
  @Transform((params) => parseInt(params.value, 10))
  @Expose()
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(14400)
  @ApiPropertyOptional({
    title: "Time limit",
    default: 600,
  })
  readonly timeLimit: number = 600;

  /**
   * Is JST
   */
  @Transform((params) => params.value === "true")
  @Expose()
  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({
    title: "Is JST",
    default: false,
  })
  readonly isJst: boolean = false;

  /**
   * Include normal
   */
  @Transform((params) => params.value === "true")
  @Expose()
  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({
    title: "Include normal",
    default: false,
  })
  readonly includeNormal: boolean = false;

  /**
   * Include quadruple
   */
  @Transform((params) => params.value === "true")
  @Expose()
  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({
    title: "Include quadruple",
    default: true,
  })
  readonly includeQuadruple: boolean = true;

  /**
   * Include 100
   */
  @Transform((params) => params.value === "true")
  @Expose()
  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({
    title: "Include 100",
    default: true,
  })
  readonly include100: boolean = true;
}

/**
 * DAM precise scoring total score prediction
 */
export class DamPreciseScoringTotalScorePrediction {
  /**
   * Time (ISO 8601)
   */
  @ApiProperty({
    title: "Time (ISO 8601)",
    example: "1970-01-01T00:00:00Z ",
  })
  readonly time!: string;

  /**
   * Score (Ingeger)
   */
  @ApiProperty({
    title: "Score (Ingeger)",
    example: "99000",
  })
  readonly scoreInteger!: number;

  /**
   * Score (String)
   */
  @ApiProperty({
    title: "Score (String)",
    example: "99.000",
  })
  readonly scoreString!: string;

  /**
   * Score type
   */
  @ApiProperty({
    title: "Score type",
    enum: DamPreciseScoringTotalScoreType,
    example: DamPreciseScoringTotalScoreType.Normal,
  })
  readonly scoreType!: DamPreciseScoringTotalScoreType;
}

/**
 * Get DAM precise scoring total score predictions response
 */
export class GetDamPreciseScoringTotalScorePredictionsResponse {
  /**
   * Score predictions
   */
  @ApiProperty({
    title: "Score predictions",
  })
  readonly scorePredictions!: DamPreciseScoringTotalScorePrediction[];
}

/**
 * Get DAM precise scoring total score prediction count DTO
 */
export class GetDamPreciseScoringTotalScorePredictionCountDto {
  /**
   * Start time
   */
  @Expose()
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    title: "Start time",
    example: "2021-01-01 00:00:00",
  })
  readonly startTime?: string;

  /**
   * Time span
   */
  @Transform((params) => parseInt(params.value, 10))
  @Expose()
  @IsOptional()
  @IsInt()
  @Min(1)
  @ApiPropertyOptional({
    title: "Time span",
    default: 1800,
  })
  readonly timeSpan: number = 1800;

  /**
   * Time limit
   */
  @Transform((params) => parseInt(params.value, 10))
  @Expose()
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(86400)
  @ApiPropertyOptional({
    title: "Time limit",
    default: 86400,
  })
  readonly timeLimit: number = 86400;
}

/**
 * DAM precise scoring total score prediction type count
 */
export class DamPreciseScoringTotalScorePredictionTypeCount {
  /**
   * Hundred count
   */
  @ApiProperty({
    title: "Hundred count",
    example: 30,
  })
  readonly hundredCount!: number;

  /**
   * Quadruple count
   */
  @ApiProperty({
    title: "Quadruple count",
    example: 5,
  })
  readonly quadrupleCount!: number;
}

/**
 * DAM precise scoring total score prediction count
 */
export class DamPreciseScoringTotalScorePredictionCount {
  /**
   * Start time (ISO 8601)
   */
  @ApiProperty({
    title: "Start time (ISO 8601)",
    example: "1970-01-01T00:00:00Z ",
  })
  readonly startTime!: string;

  /**
   * End time (ISO 8601)
   */
  @ApiProperty({
    title: "End time (ISO 8601)",
    example: "1970-01-01T00:00:00Z ",
  })
  readonly endTime!: string;

  /**
   * UTC
   */
  @ApiProperty({
    title: "UTC",
  })
  readonly utc!: DamPreciseScoringTotalScorePredictionTypeCount;

  /**
   * JST
   */
  @ApiProperty({
    title: "JST",
  })
  readonly jst!: DamPreciseScoringTotalScorePredictionTypeCount;
}

/**
 * Get DAM precise scoring total score prediction count response
 */
export class GetDamPreciseScoringTotalScorePredictionCountResponse {
  /**
   * Score prediction count
   */
  @ApiProperty({
    title: "Score prediction count",
  })
  readonly scorePredictionCount!: DamPreciseScoringTotalScorePredictionCount[];
}
