/**
 * fastify-json-parser.ts
 * @author soltia48
 * @date 2022-10-03
 */

import { BadRequestException } from "@nestjs/common";
import { FastifyRequest } from "fastify";
import { ContentTypeParserDoneFunction } from "fastify/types/content-type-parser";
import { RouteGenericInterface } from "fastify/types/route";
import { IncomingMessage, Server } from "http";
import * as secureJson from "secure-json-parse";

/**
 * Parse JSON
 * @param req Request
 * @param body Body
 * @param done Done callback
 */
export const fastifyJsonParser = (
  req: FastifyRequest<RouteGenericInterface, Server, IncomingMessage>,
  body: string | Buffer,
  done: ContentTypeParserDoneFunction
) => {
  if (typeof body !== "string") {
    return done(
      new BadRequestException(
        "Required string data when content-type is set to 'application/json'"
      ),
      undefined
    );
  }

  if (body === "" || body == null) {
    return done(
      new BadRequestException(
        "Body cannot be empty when content-type is set to 'application/json'"
      ),
      undefined
    );
  }

  let json;
  try {
    json = secureJson.parse(body);
  } catch (err) {
    return done(new BadRequestException("Body is invalid JSON"), undefined);
  }
  done(null, json);
};
