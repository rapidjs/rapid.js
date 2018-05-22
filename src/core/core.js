// @ts-check

import axios from 'axios';
import defaultsDeep from 'lodash/defaultsDeep';
import Defaults from '../config/defaults';
import Debugger from './../debug/debugger';
import { routeTypes } from '../config';
import { sanitizeUrl } from '../utils/url';
import { generateRoute } from '../utils/routes';

class Core {
  constructor(config) {
    this.config = Object.assign(defaultsDeep(config, Defaults));
    this.currentRoute = this.config.defaultRoute;
    this.customRoutes = [];
    this.requestData = {
      params: {},
      options: {},
    };
    this.routes = this.config.routes;
    this.urlParams = [];

    this.initialize();
  }

  /**
   * The order of these are important.

   * boot() will allow overriding any config before we set up
   * the http service and routes.
   *
   * sanitizeBaseURL() will sanitize the baseURL prior to setting up
   * the http service and routes.
   *
   * generateRoutes() will set up the current routes (model, collection) and their paths
   */
  initialize() {
    this.boot();

    this.sanitizeBaseURL();

    this.$setConfig('caseSensitive', this.config.caseSensitive);

    this.initializeHttp();

    this.initializeDebugger();

    this.defineCustomRoutes();
  }

  /**
   * Set any config overrides in this method when extending
   */
  boot() {}

  /**
   * Sanitize the baseURL before sending it to the http service
   */
  sanitizeBaseURL() {
    this.config.baseURL = sanitizeUrl(this.config.baseURL, this.config.trailingSlash);
  }

  /**
   * Initialize the API.
   */
  initializeHttp() {
    if (this.config.http) {
      this.http = this.config.http;
    } else {
      this.http = axios.create(defaultsDeep({ baseURL: this.config.baseURL.replace(/\/$/, '') }, this.config.apiConfig));
      this.writeInterceptorsToAPI();
    }
  }

  /**
   * Initialze the debugger if debug is set to true.
   */
  initializeDebugger() {
    this.debugger = this.config.debug ? new Debugger(this) : false;
  }

  /**
   * Set up the custom routes if we have any
   */
  defineCustomRoutes() {
    // if we have custom routes, set up a name:route mapping
    if (this.config.customRoutes.length) {
      this.config.customRoutes.forEach((route) => {
        this.customRoutes[route.name] = route;
      });
    }
  }

  /**
   * Set the interceptors to the api object
   */
  writeInterceptorsToAPI() {
    const { interceptors } = this.config;
    const types = Object.keys(interceptors);

    if (types.length) {
      types.forEach((type) => {
        interceptors[type].forEach((interceptor) => {
          this.http.interceptors[type].use(interceptor);
        });
      });
    }
  }

  /**
   * Resets the request data
   */
  resetRequestData() {
    this.requestData = {
      params: {},
      options: {},
    };
  }

  /**
   * Loop through the routes and set them
   */
  generateRoutes() {
    [routeTypes.MODEL, routeTypes.COLLECTION].forEach((route) => {
      this.routes[route] = generateRoute(route, this.config);
    });
  }

  /**
   * Setters and Getters
   */
  get collection() {
    this.currentRoute = routeTypes.COLLECTION;

    return this;
  }

  get model() {
    this.currentRoute = routeTypes.MODEL;

    return this;
  }

  get any() {
    this.currentRoute = routeTypes.ANY;

    return this;
  }

  /**
   * Set a config key and force routes to be regenerated
   *
   * @param {String} configKey
   * @param {any} val
   */
  $setConfig(configKey, val) {
    this.config[configKey] = val;
    this.generateRoutes();
  }
}

export default Core;
