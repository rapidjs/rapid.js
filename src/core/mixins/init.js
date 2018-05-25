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

// /**
//  * Initialze the debugger if debug is set to true.
//  *
//  * @param {Rapid} instance
//  */
// function initializeDebugger(instance) {
//   instance.debugger = instance.config.debug ? new Debugger(instance) : false;
// }

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

    this.initialize();
  };

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
  Rapid.prototype.initialize = function initialize() {
    this.boot();

    this.sanitizeBaseURL();

    this.$setConfig('caseSensitive', this.config.caseSensitive);

    this.initializeHttp();

    this.initializeDebugger();

    this.defineCustomRoutes();
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

  // remove these

  /**
   * Sanitize the baseURL before sending it to the http service
   */
  Rapid.prototype.sanitizeBaseURL = function sanitizeBaseURL() {
    this.config.baseURL = sanitizeUrl(this.config.baseURL, this.config.trailingSlash);
  };

  /**
   * Initialze the debugger if debug is set to true.
   */
  Rapid.prototype.initializeDebugger = function initializeDebugger() {
    this.debugger = this.config.debug ? new Debugger(this) : false;
  };

  /**
   * Initialize the API.
   */
  Rapid.prototype.initializeHttp = function initializeHttp() {
    if (this.config.http) {
      this.http = this.config.http;
    } else {
      this.http = axios.create(defaultsDeep({ baseURL: this.config.baseURL.replace(/\/$/, '') }, this.config.apiConfig));
      this.writeInterceptorsToAPI();
    }
  };

  /**
   * Set up the custom routes if we have any
   */
  Rapid.prototype.defineCustomRoutes = function defineCustomRoutes() {
    // if we have custom routes, set up a name:route mapping
    if (this.config.customRoutes.length) {
      this.config.customRoutes.forEach(route => {
        this.customRoutes[route.name] = route;
      });
    }
  };

  /**
   * Set the interceptors to the api object
   */
  Rapid.prototype.writeInterceptorsToAPI = function writeInterceptorsToAPI() {
    const { interceptors } = this.config;
    const types = Object.keys(interceptors);

    if (types.length) {
      types.forEach(type => {
        interceptors[type].forEach(interceptor => {
          this.http.interceptors[type].use(interceptor);
        });
      });
    }
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

