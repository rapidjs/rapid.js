// @ts-check

import axios from 'axios';
import defaultsDeep from 'lodash/defaultsDeep';
import Defaults from './defaults';
import Debugger from './../debug/debugger';
import Logger from './../debug/logger';
import { routeTypes } from './config';

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

    this.initialize(config);
  }

  /**
   * Set any config overrides in this method when extending
   */
  boot() {}

  /**
   * The order of these are important.

   * boot() will allow overriding any config before we set up
   * the http service and routes.
   *
   * sanitizeBaseURL() will sanitize the baseURL prior to setting up
   * the http service and routes.
   *
   * setRoutes() will set up the current routes (model, collection) and their paths
   *
   * @param {Object} config
   */
  initialize(config) {
    this.config = config;

    this.boot();

    this.fireSetters();

    this.initializeHttp();

    this.initializeDebugger();

    this.initializeLogger();

    this.defineCustomRoutes();
  }

  /**
   * Fire the setters. This will make sure the routes are generated properly.
   * Consider if this is really even necessary
   */
  fireSetters() {
    ['baseURL', 'modelName', 'routeDelimeter', 'caseSensitive'].forEach(setter => this[setter] = this.config[setter]);
  }

  /**
   * Initialze the debugger if debug is set to true.
   */
  initializeDebugger() {
    this.debugger = this.config.debug ? new Debugger(this) : false;
  }

  /**
   * Initialze the debugger if debug is set to true.
   */
  initializeLogger() {
    this.logger = this.config.debug ? Logger : false;
  }

  /**
   * Initialize the API.
   */
  initializeHttp() {
    this.http = axios.create(defaultsDeep({ baseURL: this.config.baseURL.replace(/\/$/, '') }, this.config.apiConfig));
    this.writeInterceptorsToAPI();
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
  setRoutes() {
    [routeTypes.MODEL, routeTypes.COLLECTION].forEach(route => this.setRoute(route));
  }

  /**
   * Setters and Getters
   */

  set debug(val) {
    if (this.config.debug) {
      this.logger.warn('debug mode must explicitly be turned on via the constructor in config.debug');
    }
  }

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

  get interceptors() {
    return this.config.interceptors;
  }

  set baseURL(url) {
    this.config.baseURL = this.sanitizeUrl(url);
    this.initializeHttp();
  }

  set modelName(val) {
    this.config.modelName = val;
    this.setRoutes();
  }

  set routeDelimeter(val) {
    this.config.routeDelimeter = val;
    this.setRoutes();
  }

  set caseSensitive(val) {
    this.config.caseSensitive = val;
    this.setRoutes();
  }
}

export default Core;
