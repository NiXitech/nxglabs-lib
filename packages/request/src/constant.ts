import { HttpStatusCode } from 'axios';

export const HttpCodeError: Record<number, string> = {
  [HttpStatusCode.BadRequest]: '请求错误',
  [HttpStatusCode.Unauthorized]: '未授权的访问',
  [HttpStatusCode.Forbidden]: '访问被禁止',
  [HttpStatusCode.NotFound]: '资源不存在',
  [HttpStatusCode.InternalServerError]: '服务器繁忙，请稍后再试',
  [HttpStatusCode.BadGateway]: '服务器繁忙，请稍后再试',
  [HttpStatusCode.ServiceUnavailable]: '服务器繁忙，请稍后再试',
  [HttpStatusCode.GatewayTimeout]: '请求超时，请稍后再试',
};

export const BEFORE_PATH_REGX = /^\//;
export const AFTER_PATH_REGX = /\/$/;

export const GET_REGX = /GET/i;
export const COMMON_REQUEST_METHODS = /(POST|PUT|PATCH)/i;
