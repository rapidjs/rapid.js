import defaultsDeep from 'lodash/defaultsDeep';
import defaults from '../../config/defaults';
import { routeTypes } from '../../config';
import { generateRoute } from '../../utils/routes';
import { sanitizeUrl } from '../../utils/url';
import { applyCallableRequestMethods } from './request';

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
 * Initialize the API.
 *
 * @param {Rapid} instance
 */
function initializeHttp(instance) {
  instance.http = instance.config.http;
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

  applyCallableRequestMethods(instance);
}

export function InitMixin(Rapid) {
  Rapid.prototype._init = function _init(config = {}) {
    this.config = Object.assign(defaultsDeep(config, defaults));
    this.currentRoute = this.config.defaultRoute;
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
  Object.defineProperty(Rapid.prototype, routeTypes.COLLECTION, {
    get: function collection() {
      this.currentRoute = routeTypes.COLLECTION;

      return this;
    },
  });

  Object.defineProperty(Rapid.prototype, routeTypes.MODEL, {
    get: function model() {
      this.currentRoute = routeTypes.MODEL;

      return this;
    },
  });

  Object.defineProperty(Rapid.prototype, routeTypes.ANY, {
    get: function any() {
      this.currentRoute = routeTypes.ANY;

      return this;
    },
  });

  Object.defineProperty(Rapid.prototype, 'default', {
    get: function def() {
      this.currentRoute = this.config.defaultRoute;

      return this;
    },
  });
}

