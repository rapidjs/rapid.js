// @ts-check
import axios from 'axios';
import defaultsDeep from 'lodash/defaultsDeep';
import defaults from '../../config/defaults';
import Debugger from '../../debug/debugger';
import { routeTypes } from '../../config';
import { generateRoute } from '../../utils/routes';
import { sanitizeUrl } from '../../utils/url';

/**
 * Loop through the routes and set them
 *
 * @param {Rapid} instance
 */
function generateRoutes(instance) {
  [routeTypes.MODEL, routeTypes.COLLECTION].forEach(route => {
    instance.routes[route] = generateRoute(route, instance.config);
  });
}

/**
 * Sanitize the baseURL before sending it to the http service
 *
 * @param {Rapid} instance
 */
function sanitizeBaseURL(instance) {
  instance.config.baseURL = sanitizeUrl(instance.config.baseURL, instance.config.trailingSlash);
}

/**
 * Initialze the debugger if debug is set to true.
 *
 * @param {Rapid} instance
 */
function initializeDebugger(instance) {
  instance.debugger = instance.config.debug ? new Debugger(instance) : false;
}

/**
 * Set the interceptors to the api object
 *
 * @param {Rapid} instance
 */
function writeInterceptorsToAPI(instance) {
  const { interceptors } = instance.config;
  const types = Object.keys(interceptors);

  if (types.length) {
    types.forEach(type => {
      interceptors[type].forEach(interceptor => {
        instance.http.interceptors[type].use(interceptor);
      });
    });
  }
}

/**
 * Initialize the API.
 *
 * @param {Rapid} instance
 */
function initializeHttp(instance) {
  if (instance.config.http) {
    instance.http = instance.config.http;
  } else {
    instance.http = axios.create(defaultsDeep(
      { baseURL: instance.config.baseURL },
      instance.config.apiConfig,
    ));

    writeInterceptorsToAPI(instance);
  }
}

/**
 * Set up the custom routes if we have any
 *
 * @param {Rapid} instance
 */
function defineCustomRoutes(instance) {
  // if we have custom routes, set up a name:route mapping
  if (instance.config.customRoutes.length) {
    instance.config.customRoutes.forEach(route => {
      instance.customRoutes[route.name] = route;
    });
  }
}

/**
 * Apply allowed request methods to the class
 *
 * By default this adds: get(), post(), put(), patch(), head(), delete()
 *
 * @param {Rapid} instance
 */
function applyCallableRequestMethods(instance) {
  instance.config.allowedRequestTypes.forEach(requestType => {
    instance[requestType] = (...urlParams) => instance.buildRequest(requestType, urlParams);
  });
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
 *
 * @param {Rapid} instance
 */
function setup(instance) {
  instance.boot();

  sanitizeBaseURL(instance);

  instance.$setConfig('caseSensitive', instance.config.caseSensitive);

  initializeHttp(instance);

  initializeDebugger(instance);

  defineCustomRoutes(instance);

  applyCallableRequestMethods(instance);
}

export function InitMixin(Rapid) {
  Rapid.prototype._init = function _init(config = {}) {
    this.config = Object.assign(defaultsDeep(config, defaults));
    this.currentRoute = this.config.defaultRoute;
    this.customRoutes = [];
    this.requestData = {
      params: {},
      options: {},
    };
    this.routes = this.config.routes;
    this.urlParams = [];

    setup(this);
  };

  /**
   * Set any config overrides in this method when extending
   */
  Rapid.prototype.boot = function boot() {};

  /**
   * Set a config key and force routes to be regenerated
   *
   * @param {String} configKey
   * @param {any} val
   */
  Rapid.prototype.$setConfig = function $setConfig(configKey, val) {
    this.config[configKey] = val;

    generateRoutes(this);
  };

  /**
   * Getters for switching routes
   */
  Object.defineProperty(Rapid.prototype, 'collection', {
    get: function collection() {
      this.currentRoute = routeTypes.COLLECTION;

      return this;
    },
  });

  Object.defineProperty(Rapid.prototype, 'model', {
    get: function model() {
      this.currentRoute = routeTypes.MODEL;

      return this;
    },
  });

  Object.defineProperty(Rapid.prototype, 'any', {
    get: function any() {
      this.currentRoute = routeTypes.ANY;

      return this;
    },
  });
}

