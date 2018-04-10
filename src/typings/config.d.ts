import { CustomRoute } from './custom-routes.d';
import { Route } from './routes.d';
import AuthConfig from './auth-config.d';
import AxiosAdapter from './../core/adapters/axios-adapter';
import { RequestType } from './request';

export declare interface Config {
  afterRequest(response);
  allowedRequestTypes: Array<RequestType>;
  auth: AuthConfig;
  baseURL: string;
  caseSensitive: boolean;
  customRoutes: CustomRoute[];
  debug: boolean;
  defaultRoute: Route;
  extension?: string;
  onError(error: () => void);
  globalParameters: object;
  http: AxiosAdapter;
  httpConfig: object;
  modelName: string;
  methods: {
    create?: string;
    update?: string;
    destroy?: string;
    restore?: string;
  };
  beforeRequest(type: RequestType, url: string);
  primaryKey: string;
  routeDelimeter: string;
  routes: {
    any?: string;
    model?: string;
    collection?: string;
  };
  suffixes: {
    create?: string;
    update?: string;
    destroy?: string;
    restore?: string;
  };
  trailingSlash: boolean;
}



