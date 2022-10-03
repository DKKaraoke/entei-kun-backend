/**
 * app.controller.ts
 * @author soltia48
 * @date 2022-10-03
 */

import { BadRequestException, Controller, Get, Query } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import dayjs = require("dayjs");
import {
  GetDamPreciseScoringTotalScorePredictionCountDto,
  GetDamPreciseScoringTotalScorePredictionsDto,
  GetDamPreciseScoringTotalScorePredictionsResponse,
} from "./app.dto";
import { AppService } from "./app.service";

/**
 * App controller
 */
@Controller()
@ApiTags("Root")
export class AppController {
  /**
   * Constructor
   * @param service Service
   */
  constructor(
    private readonly configService: ConfigService,
    private readonly service: AppService
  ) {}

  /**
   * Get score predictions
   * @return Score predictions
   */
  @Get("_score_predictions")
  @ApiOperation({ summary: "Score predictions" })
  @ApiResponse({
    status: 200,
    type: GetDamPreciseScoringTotalScorePredictionsResponse,
    description: "Success",
  })
  getScorePredictions(@Query() query: GetDamPreciseScoringTotalScorePredictionsDto) {
    const startTime = dayjs(query.startTime);
    if (!startTime.isValid()) {
      throw new BadRequestException("INVALID_START_TIME");
    }

    const scorePredictions = this.service.predictDamPreciseScoringTotalScore(
      startTime,
      query.timeLimit,
      query.isJst,
      query.includeNormal,
      query.includeQuadruple,
      query.include100
    );

    return { scorePredictions };
  }

  /**
   * Get score prediction count
   * @return Score prediction count
   */
  @Get("_score_prediction_count")
  @ApiOperation({ summary: "Score prediction count" })
  @ApiResponse({
    status: 200,
    type: GetDamPreciseScoringTotalScorePredictionsResponse,
    description: "Success",
  })
  getScorePredictionCount(@Query() query: GetDamPreciseScoringTotalScorePredictionCountDto) {
    const startTime = dayjs(query.startTime);
    if (!startTime.isValid()) {
      throw new BadRequestException("INVALID_START_TIME");
    }

    const scorePredictionCount = this.service.countDamPreciseScoringTotalScorePrediction(
      startTime,
      query.timeSpan,
      query.timeLimit
    );

    return { scorePredictionCount };
  }
}
