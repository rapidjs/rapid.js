import defaultsDeep from 'lodash/defaultsDeep';
import { Rapid } from './config/types';
import { createAllMethod } from './api/all';
import { createFindMethod } from './api/find';
import { createFindByMethod } from './api/find-by';
import { createRequestMethod } from './api/request';
import { createIdMethod } from './api/id';
import { getDefaultConfig } from './config/get-default-config';

export function createRapid(config: Rapid.Config): Rapid.API {
  if (!config.modelName) {
    throw new Error('You must specify a modelName.');
  }

  if (!config.http) {
    throw new Error('You must specify an http instance to use.');
  }

  Object.assign(config, defaultsDeep(config, getDefaultConfig()));

  const context: Rapid.Context = {
    api: <Rapid.API>{},
    config,
    currentRoute: <Rapid.Routes>config.defaultRoute,
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

    /**
     * A getter for chaining requests and switching to `collection` mode
     */
    get collection(): Rapid.Chainable {
      context.currentRoute = Rapid.Routes.Collection;

      return context.api;
    },

    /**
     * A getter for chaining requests and switching to `model` mode
     */
    get model(): Rapid.Chainable {
      context.currentRoute = Rapid.Routes.Model;

      return context.api;
    },
  };

  function makeRequest(type: Rapid.RequestType, url: string): Promise<any> {
    if (config.beforeRequest) {
      config.beforeRequest(type, url);
    }
    // .call(this, this.sanitizeUrl(url), ...this.parseRequestData(type))

    return new Promise((resolve, reject) => {
      config.http[type](url, {})
        .then(response => {
          resetRequestData();
          resetURLParams();

          if (config.afterRequest) {
            config.afterRequest(response);
          }

          resolve(response);
        })
        .catch(error => {
          resetRequestData();
          resetURLParams();

          if (config.onError) {
            config.onError(error);
          }

          reject(error);
        });
    });
  }

  function buildRequest(type: Rapid.RequestType, url: string): Promise<any> {
    return makeRequest(type, url);
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

  return context.api;
}
