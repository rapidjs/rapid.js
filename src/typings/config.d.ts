import { CustomRoute } from './custom-routes.d';
import { Route } from './routes.d';
import AuthConfig from './auth-config.d';
import AxiosAdapter from './../core/adapters/axios-adapter';

export declare interface Config {
  auth: AuthConfig,
  baseURL: string;
  caseSensitive: boolean;
  customRoutes: CustomRoute[];
  debug: boolean;
  defaultRoute: Route;
  http: AxiosAdapter;
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



