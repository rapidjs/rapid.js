import { CustomRoute } from './custom-routes';
import { Route } from './routes';
import AxiosAdapter from '../core/adapters/axios-adapter';

export declare interface Config {
  baseURL: string;
  customRoutes: CustomRoute[];
  defaultRoute: Route;
  http: AxiosAdapter; // HttpAdapterInterface
  httpConfig: object;
  routes: {
    any?: string;
    model?: string;
    collection?: string;
  };
  trailingSlash: boolean;
}
