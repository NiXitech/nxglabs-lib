import { HttpStatusCode } from 'axios';
import {
  AFTER_PATH_REGX,
  BEFORE_PATH_REGX,
  COMMON_REQUEST_METHODS,
  GET_REGX,
  HttpCodeError,
} from './constant';
import { ServiceCallOptions, ServiceError, ServiceOptions } from './type';

class Service {
  options: ServiceOptions;
  constructor(options: ServiceOptions) {
    this.options = options;
  }

  async call<T>({ apiName, params, options = {} }: ServiceCallOptions): Promise<T | ServiceError> {
    const { baseUrl, http } = this.options;
    const beforePath = BEFORE_PATH_REGX.test(apiName) ? '' : '/';
    const requestUrl = `${baseUrl.replace(AFTER_PATH_REGX, '')}${beforePath}${apiName}`;
    const { method = 'POST' } = options;
    const requestOptions = {
      method,
      url: requestUrl,
      ...options,
    };

    if (GET_REGX.test(method)) {
      Object.assign(requestOptions, {
        params,
      });
    } else if (COMMON_REQUEST_METHODS.test(method)) {
      Object.assign(requestOptions, {
        data: params,
      });
    }

    try {
      const res = await http.request<unknown, { code: HttpStatusCode; data: any; err_msg: string }>(
        requestOptions,
      );
      const { code, data } = res;
      if (code === HttpStatusCode.Ok || code === HttpStatusCode.Created) {
        return data;
      } else {
        return Service.handleError(res);
      }
    } catch (error) {
      throw error;
    }
  }

  static handleError(err: any) {
    const { code, err_msg } = err;
    const errorText = `${HttpCodeError[code] || err_msg}`;
    return {
      code: code,
      msg: errorText,
    };
  }
}

export { Service };
