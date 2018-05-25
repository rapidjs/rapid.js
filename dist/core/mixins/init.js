'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InitMixin = InitMixin;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _defaultsDeep = require('lodash/defaultsDeep');

var _defaultsDeep2 = _interopRequireDefault(_defaultsDeep);

var _defaults = require('../../config/defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _debugger = require('../../debug/debugger');

var _debugger2 = _interopRequireDefault(_debugger);

var _config = require('../../config');

var _routes = require('../../utils/routes');

var _url = require('../../utils/url');

var _request = require('./request');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Loop through the routes and set them
 *
 * @param {Rapid} instance
 */
// @ts-check
function generateRoutes(instance) {
  [_config.routeTypes.MODEL, _config.routeTypes.COLLECTION].forEach(function (route) {
    instance.routes[route] = (0, _routes.generateRoute)(route, instance.config);
  });
}

/**
 * Sanitize the baseURL before sending it to the http service
 *
 * @param {Rapid} instance
 */
function sanitizeBaseURL(instance) {
  instance.config.baseURL = (0, _url.sanitizeUrl)(instance.config.baseURL, instance.config.trailingSlash);
}

/**
 * Initialze the debugger if debug is set to true.
 *
 * @param {Rapid} instance
 */
function initializeDebugger(instance) {
  instance.debugger = instance.config.debug ? new _debugger2.default(instance) : false;
}

/**
 * Set the interceptors to the api object
 *
 * @param {Rapid} instance
 */
function writeInterceptorsToAPI(instance) {
  var interceptors = instance.config.interceptors;

  var types = Object.keys(interceptors);

  if (types.length) {
    types.forEach(function (type) {
      interceptors[type].forEach(function (interceptor) {
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
    instance.http = _axios2.default.create((0, _defaultsDeep2.default)({ baseURL: instance.config.baseURL }, instance.config.apiConfig));

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
    instance.config.customRoutes.forEach(function (route) {
      instance.customRoutes[route.name] = route;
    });
  }
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

  (0, _request.applyCallableRequestMethods)(instance);
}

function InitMixin(Rapid) {
  Rapid.prototype._init = function _init() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    this.config = Object.assign((0, _defaultsDeep2.default)(config, _defaults2.default));
    this.currentRoute = this.config.defaultRoute;
    this.customRoutes = [];
    this.requestData = {
      params: {},
      options: {}
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
      this.currentRoute = _config.routeTypes.COLLECTION;

      return this;
    }
  });

  Object.defineProperty(Rapid.prototype, 'model', {
    get: function model() {
      this.currentRoute = _config.routeTypes.MODEL;

      return this;
    }
  });

  Object.defineProperty(Rapid.prototype, 'any', {
    get: function any() {
      this.currentRoute = _config.routeTypes.ANY;

      return this;
    }
  });
}