// @ts-check
import defaultsDeep from 'lodash/defaultsDeep';
import defaults from '../../config/defaults';
import Debugger from '../../debug/debugger';
import { routeTypes } from '../../config';
import { generateRoute } from '../../utils/routes';

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
 * Initialze the debugger if debug is set to true.
 *
 * @param {Rapid} instance
 */
function initializeDebugger(instance) {
  instance.debugger = instance.config.debug ? new Debugger(instance) : false;
}

export function InitMixin(Rapid) {
  Rapid.prototype._init = function _init(config = {}) {
    this.config = Object.assign(defaultsDeep(config, defaults));
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

