import { CustomRoute } from './custom-routes.d';
import { Route } from './routes.d';
import AxiosAdapter from '../core/adapters/axios-adapter';

export declare interface Config {
  baseURL: string;
  caseSensitive: boolean;
  customRoutes: CustomRoute[];
  debug: boolean;
  defaultRoute: Route;
  http: HttpAdapter;
  httpConfig: object;
  modelName: string;
  methods: {
    create?: string;
    update?: string;
    destroy?: string;
    restore?: string;
  };
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



