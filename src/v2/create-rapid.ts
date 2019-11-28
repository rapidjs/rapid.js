import defaultsDeep from 'defaults-deep';
import { Rapid } from './config/types';
import { createAllMethod } from './api/all';
import { createFindMethod } from './api/find';
import { createFindByMethod } from './api/find-by';
import { createRequestMethod } from './api/request';
import { createIdMethod } from './api/id';
import { getDefaultConfig } from './config/get-default-config';

export function createRapid(config: Rapid.ConfigWithModel): Rapid.API;
export function createRapid(config: Rapid.InitializerConfig): Rapid.Thunk;
export function createRapid(config: Rapid.InitializerConfig | Rapid.ConfigWithModel): Rapid.Thunk | Rapid.API {
  if (!config) {
    throw new Error(Rapid.Errors.NoConfigProvided);
  }

  if (!config.http) {
    throw new Error(Rapid.Errors.NoHttp);
  }

  const context: Rapid.Context = {
    api: <Rapid.API>{},
    config: Object.assign(config, defaultsDeep(config, getDefaultConfig())),
    internals: {
      buildRequest,
      resetRequestData,
      resetURLParams,
    },
    requestData: {
      params: {},
      options: {},
    },
    urlParams: [],
  };

  context.api = {
    all: createAllMethod(context),
    find: createFindMethod(context),
    findBy: createFindByMethod(context),
    get: createRequestMethod(context, Rapid.RequestType.Get),
    id: createIdMethod(context),
  };

  // if a model name is provided, we return the standard API to be used a singleton
  if (context.config.modelName) {
    return context.api;
  }

  return function rapid(modelName: string): Rapid.API {
    if (!modelName) {
      throw new Error(Rapid.Errors.NoModelName);
    }

    context.config.modelName = modelName;

    return context.api;
  };

  function makeRequest(requestType: Rapid.RequestType): Promise<any> {
    const preparedUrl = makeUrl(requestType);

    if (context.config.beforeRequest) {
      context.config.beforeRequest(requestType, preparedUrl);
    }
    // .call(this, this.sanitizeUrl(url), ...this.parseRequestData(type))

    return new Promise((resolve, reject) => {
      context.config.http[requestType](preparedUrl, {})
        .then(response => {
          resetRequestData();
          resetURLParams();

          if (context.config.afterRequest) {
            context.config.afterRequest(response);
          }

          resolve(response);
        })
        .catch(error => {
          resetRequestData();
          resetURLParams();

          if (context.config.onError) {
            context.config.onError(error);
          }

          reject(error);
        });
    });
  }

  function buildRequest(type: Rapid.RequestType, url: string): Promise<any> {
    return makeRequest(type);
  }

  /**
   * Reset the request data
   */
  function resetRequestData(): void {
    context.requestData = {
      params: {},
      options: {},
    };
  }

  /**
   * Reset an URL params set from a relationship
   */
  function resetURLParams(): void {
    context.urlParams = [];
  }

  function makeUrl(requestType: Rapid.RequestType): string {
    const params = [context.config.modelName, ...context.urlParams].filter(Boolean);

    if (context.config.baseURL) {
      params.unshift(context.config.baseURL);
    }

    // apply a suffix for the request type if applicable
    if (context.config.suffixes[requestType]) {
      params.push(context.config.suffixes[requestType]);
    }

    if (context.config.trailingSlash) {
      params.push('');
    }

    const url = params.join('/');

    return context.config.transformURL ? context.config.transformURL(url) : url;
  }
}
