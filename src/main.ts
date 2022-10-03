/**
 * main.ts
 * @author soltia48
 * @date 2022-10-03
 */

import fastifyCors from "@fastify/cors";
import { LogLevel } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as dayjs from "dayjs";
import * as objectSupport from "dayjs/plugin/objectSupport";
import * as timezone from "dayjs/plugin/timezone";
import * as utc from "dayjs/plugin/utc";
import * as dotenv from "dotenv";
import fastify from "fastify";

import { AppModule } from "./app.module";
import { logOnSend, logPreValidation } from "./fastify/fastify-verbose-log";
import { AllExceptionsFilter } from "./filters/all-exceptions.filter";
import { ValidationPipe } from "./pipes/custom-validation.pipe";

dotenv.config();

/**
 * Bootstrap
 */
async function bootstrap() {
  const forDevelopment = process.env.NODE_ENV === "development";

  dayjs.extend(objectSupport);
  dayjs.extend(timezone);
  dayjs.extend(utc);
  dayjs.tz.setDefault("Etc/UTC");

  const server = fastify();
  server.register(fastifyCors);
  // Compatibility for passport
  server.addHook("onRequest", (request, reply, done) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const replyUnknown = reply as any;
    replyUnknown["setHeader"] = reply.header.bind(reply);
    replyUnknown["end"] = reply.send.bind(reply);
    done();
  });

  const logLevels: LogLevel[] = ["log", "error", "warn"];
  if (forDevelopment) {
    logLevels.push("debug", "verbose");
  }
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(server),
    { logger: logLevels }
  );
  const configService = app.get(ConfigService);

  // Verbose log
  server.addHook("preValidation", logPreValidation);
  server.addHook("onSend", logOnSend);

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        ignoreDecorators: true,
        excludeExtraneousValues: true,
        exposeDefaultValues: true,
      },
    })
  );

  if (forDevelopment) {
    const documentConfig = new DocumentBuilder()
      .setTitle("entei-kun-backend")
      .setDescription("The backend of the Entei-kun API")
      .setVersion("0.0.1")
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, documentConfig);
    SwaggerModule.setup("doc", app, document);
  }

  const portString = configService.get<string>("BIND_PORT");
  if (!portString) {
    throw new Error("Environment variable BIND_PORT is undefined.");
  }
  const port = parseInt(portString, 10);
  if (port === Number.NaN) {
    throw new Error("Environment variable BIND_PORT is not a number.");
  }
  const host = configService.get<string>("BIND_HOST");
  if (!host) {
    throw new Error("Environment variable BIND_HOST is undefined.");
  }
  await app.listen(port, host);
}
bootstrap();
