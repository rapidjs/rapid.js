import { CustomRoute } from './custom-routes';
import { Route } from './routes';
import AxiosAdapter from '../core/adapters/axios-adapter';

export declare interface Config {
  baseURL: string;
  caseSensitive: boolean;
  customRoutes: CustomRoute[];
  debug: boolean;
  defaultRoute: Route;
  http: AxiosAdapter; // HttpAdapterInterface
  httpConfig: object;
  modelName: string;
  primaryKey: string;
  routeDelimeter: string;
  routes: {
    any?: string;
    model?: string;
    collection?: string;
  };
  trailingSlash: boolean;
}
