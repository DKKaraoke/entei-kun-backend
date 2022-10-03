/**
 * all-exceptions.filter.ts
 * @author SONODA Yudai
 * @date 2022-09-01
 */

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import * as dayjs from "dayjs";
import { FastifyReply } from "fastify";

/**
 * Response data
 */
interface ResponseData {
  statusCode?: number;
  message?: string;
  error?: string;
  errors: Record<string, unknown>[];
}

/**
 * All exceptions filter
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger("ExceptionsHandler");

  /**
   * Is exception object
   * @param exception Exception
   * @return If true to object is exception, false to else
   */
  private static isExceptionObject(exception: unknown): exception is Error {
    return typeof exception === "object" && !!(exception as Error).message;
  }

  /**
   * Catch
   * @param exception Exception
   * @param host Host
   */
  catch(exception: unknown, host: ArgumentsHost) {
    const timestamp = dayjs().tz().toISOString();

    if (AllExceptionsFilter.isExceptionObject(exception)) {
      if (!(exception instanceof HttpException)) {
        this.logger.error(exception.message, exception.stack);
      }
    } else {
      this.logger.error(exception);
    }

    const ctx = host.switchToHttp();
    const response: FastifyReply = ctx.getResponse();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let statusDescription = "Internal Server Error";
    let data: ResponseData | undefined;
    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      statusDescription = HttpStatus[statusCode]
        .split("_")
        .map((value) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase())
        .join(" ");

      let responseData = exception.getResponse() as string | ResponseData;
      if (typeof responseData === "string") {
        responseData = { errors: [{ message: data }] };
      } else {
        delete responseData.statusCode;
        if (responseData.message && responseData.message !== statusDescription) {
          responseData = { errors: [{ ...responseData }] };
        } else {
          delete responseData.message;
        }
        // Same as statusDescription
        delete responseData.error;
      }
      data = responseData;
    }

    response.status(statusCode).send({
      statusCode,
      statusDescription,
      ...data,
      timestamp,
    });
  }
}
