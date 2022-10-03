/**
 * fastify-verbose-log.ts
 * @author soltia48
 * @date 2022-10-03
 */

import { Logger } from "@nestjs/common";
import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";

const logger = new Logger("FastifyServer");

/**
 * Log preValidation
 * @param request Request
 * @param reply Reply
 * @param done Done function
 */
export const logPreValidation = (
  request: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction
) => {
  const { url, method, params, query, headers, body } = request;
  const data = { url, method, params, query, headers, body };
  logger.verbose(`HTTP onRequest:\n${JSON.stringify(data, null, "  ")}`);
  done();
};

/**
 * Log onSend
 * @param request Request
 * @param reply Reply
 * @param payload Payload
 * @param done Done function
 */
export const logOnSend = (
  request: FastifyRequest,
  reply: FastifyReply,
  payload: unknown,
  done: HookHandlerDoneFunction
) => {
  let body;
  if (typeof payload === "string") {
    try {
      body = JSON.parse(payload);
    } catch (e) {
      body = payload;
    }
  } else if (payload) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body = `[${(payload as any).constructor.name}]`;
  }
  const data = { headers: reply.getHeaders(), body };
  logger.verbose(`HTTP onSend:\n${JSON.stringify(data, null, "  ")}`);
  done();
};
