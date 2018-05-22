"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const defaultsDeep_1 = __importDefault(require("lodash/defaultsDeep"));
const kebabCase_1 = __importDefault(require("lodash/kebabCase"));
const pluralize_1 = __importDefault(require("pluralize"));
const route_1 = require("./route");
const url_1 = require("../utils/url");
const debugger_1 = __importDefault(require("./../debug/debugger"));
const defaults_1 = __importDefault(require("./defaults"));
const axios_adapter_1 = __importDefault(require("./adapters/axios-adapter"));
class Core {
    constructor(config) {
        this.config = Object.assign({}, defaultsDeep_1.default(config, defaults_1.default));
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
    initialize() {
        this.boot();
        this.sanitizeBaseURL();
        this.setRoutes();
        this.defineCustomRoutes();
        this.initializeHttp();
        this.initializeDebugger();
    }
    boot() { }
    sanitizeBaseURL() {
        this.config.baseURL = url_1.sanitizeUrl(this.config.baseURL, this.config.trailingSlash);
    }
    setRoutes() {
        ['model', 'collection'].forEach((route) => this.setRoute(route));
    }
    setRoute(route) {
        let newRoute = '';
        const formattedRoute = {
            model: this.config.modelName,
            collection: pluralize_1.default(this.config.modelName),
            any: '',
        };
        if (this.config.routes[route] !== '') {
            newRoute = this.config.routes[route];
        }
        else {
            newRoute = kebabCase_1.default(formattedRoute[route]).replace(/-/g, this.config.routeDelimeter);
            if (this.config.caseSensitive) {
                newRoute = formattedRoute[route];
            }
        }
        this.routes[route] = newRoute;
    }
    defineCustomRoutes() {
        if (this.config.customRoutes.length) {
            this.config.customRoutes.forEach((route) => {
                this.customRoutes[route.name] = route;
            });
        }
    }
    initializeHttp() {
        const httpConfig = defaultsDeep_1.default({
            baseURL: this.config.baseURL.replace(/\/$/, ''),
        }, this.config.httpConfig);
        this.http = new axios_adapter_1.default(httpConfig);
    }
    initializeDebugger() {
        this.debugger = this.config.debug ? new debugger_1.default(this) : null;
    }
    resetRequestData() {
        this.requestData = {
            params: {},
            options: {},
        };
    }
    resetURLParams() {
        this.urlParams = [];
    }
    get collection() {
        this.currentRoute = route_1.Route.COLLECTION;
        return this;
    }
    get model() {
        this.currentRoute = route_1.Route.MODEL;
        return this;
    }
    get any() {
        this.currentRoute = route_1.Route.ANY;
        return this;
    }
}
exports.default = Core;

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * The Caramel Core functionality of Rapid
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _defaultsDeep = require('lodash/defaultsDeep');

var _defaultsDeep2 = _interopRequireDefault(_defaultsDeep);

var _defaults = require('./defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _debugger = require('./../debug/debugger');

var _debugger2 = _interopRequireDefault(_debugger);

var _logger = require('./../debug/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Core = function () {
  function Core(config) {
    _classCallCheck(this, Core);

    config = config || {};

    config = (0, _defaultsDeep2.default)(config, _defaults2.default);

    this.initialize(config);
  }

  /**
   * Set any config overrides in this method when extending
   */


  _createClass(Core, [{
    key: 'boot',
    value: function boot() {}

    /**
     * Setup the all of properties.
     * @param {Object} config
     */

  }, {
    key: 'initialize',
    value: function initialize(config) {
      this.config = config;

      this.initializeRoutes();

      this.boot();

      this.resetURLParams();

      this.fireSetters();

      this.initializeAPI();

      this.setCurrentRoute(this.config.defaultRoute);

      this.initializeDebugger();

      this.initializeLogger();

      this.resetRequestData();

      this.defineCustomRoutes();
    }

    /**
     * Fire the setters. This will make sure the routes are generated properly.
     * Consider if this is really even necessary
     */

  }, {
    key: 'fireSetters',
    value: function fireSetters() {
      var _this = this;

      ['baseURL', 'modelName', 'routeDelimeter', 'caseSensitive'].forEach(function (setter) {
        return _this[setter] = _this.config[setter];
      });
    }

    /**
     * Initialze the debugger if debug is set to true.
     */

  }, {
    key: 'initializeDebugger',
    value: function initializeDebugger() {
      this.debugger = this.config.debug ? new _debugger2.default(this) : false;
    }

    /**
     * Initialze the debugger if debug is set to true.
     */

  }, {
    key: 'initializeLogger',
    value: function initializeLogger() {
      this.logger = this.config.debug ? _logger2.default : false;
    }

    /**
     * Initialize the API.
     */

  }, {
    key: 'initializeAPI',
    value: function initializeAPI() {
      this.api = _axios2.default.create((0, _defaultsDeep2.default)({ baseURL: this.config.baseURL.replace(/\/$/, '') }, this.config.apiConfig));
      this.writeInterceptorsToAPI();
    }

    /**
     * Initialize the routes.
     */

  }, {
    key: 'initializeRoutes',
    value: function initializeRoutes() {
      this.routes = this.config.routes;
    }

    /**
     * Set up the custom routes if we have any
     */

  }, {
    key: 'defineCustomRoutes',
    value: function defineCustomRoutes() {
      var _this2 = this;

      this.customRoutes = [];

      // if we have custom routes, set up a name:route mapping
      if (this.config.customRoutes.length) {
        this.config.customRoutes.forEach(function (route) {
          _this2.customRoutes[route.name] = route;
        });
      }
    }

    /**
     * Set the interceptors to the api object
     */

  }, {
    key: 'writeInterceptorsToAPI',
    value: function writeInterceptorsToAPI() {
      var _this3 = this;

      var interceptors = this.config.interceptors;

      var types = Object.keys(interceptors);

      if (types.length) {
        types.forEach(function (type) {
          interceptors[type].forEach(function (interceptor) {
            _this3.api.interceptors[type].use(interceptor);
          });
        });
      }
    }

    /**
     * Resets the request data
     */

  }, {
    key: 'resetRequestData',
    value: function resetRequestData() {
      this.requestData = {
        params: {},
        options: {}
      };
    }

    /**
     * Setters and Getters
     */

  }, {
    key: 'debug',
    set: function set(val) {
      if (this.config.debug) {
        this.logger.warn('debug mode must explicitly be turned on via the constructor in config.debug');
      }
    }
  }, {
    key: 'collection',
    get: function get() {
      this.setCurrentRoute('collection');

      return this;
    }
  }, {
    key: 'model',
    get: function get() {
      this.setCurrentRoute('model');

      return this;
    }
  }, {
    key: 'any',
    get: function get() {
      this.setCurrentRoute('any');

      return this;
    }
  }, {
    key: 'interceptors',
    get: function get() {
      return this.config.interceptors;
    }
  }, {
    key: 'baseURL',
    set: function set(url) {
      this.config.baseURL = this.sanitizeUrl(url);
      this.initializeAPI();
    }
  }, {
    key: 'modelName',
    set: function set(val) {
      this.config.modelName = val;
      this.setRoutes();
    }
  }, {
    key: 'routeDelimeter',
    set: function set(val) {
      this.config.routeDelimeter = val;
      this.setRoutes();
    }
  }, {
    key: 'caseSensitive',
    set: function set(val) {
      this.config.caseSensitive = val;
      this.setRoutes();
    }
  }]);

  return Core;
}();

exports.default = Core;
