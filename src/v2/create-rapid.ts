import defaultsDeep from 'lodash/defaultsDeep';
import { Rapid } from './config/types';
import { createAllMethod } from './api/all';
import { createFindMethod } from './api/find';
import { createFindByMethod } from './api/find-by';
import { createRequestMethod } from './api/request';
import { createIdMethod } from './api/id';
import { getDefaultConfig } from './config/get-default-config';

export function createRapid(config: Rapid.Config): Rapid.API {
  Object.assign(config, defaultsDeep(config, getDefaultConfig()));

  const context: Rapid.Context = {
    api: <Rapid.API>{},
    config,
    currentRoute: <Rapid.Routes>config.defaultRoute,
    internals: {
      makeRequest,
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

  function makeRequest(params): Promise<any> {
    return Promise.resolve();
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
