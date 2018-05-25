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

function generateRoutes(instance) {
  [_config.routeTypes.MODEL, _config.routeTypes.COLLECTION].forEach(function (route) {
    instance.routes[route] = (0, _routes.generateRoute)(route, instance.config);
  });
}

function sanitizeBaseURL(instance) {
  instance.config.baseURL = (0, _url.sanitizeUrl)(instance.config.baseURL, instance.config.trailingSlash);
}

function initializeDebugger(instance) {
  instance.debugger = instance.config.debug ? new _debugger2.default(instance) : false;
}

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

function initializeHttp(instance) {
  if (instance.config.http) {
    instance.http = instance.config.http;
  } else {
    instance.http = _axios2.default.create((0, _defaultsDeep2.default)({ baseURL: instance.config.baseURL }, instance.config.apiConfig));

    writeInterceptorsToAPI(instance);
  }
}

function defineCustomRoutes(instance) {
  if (instance.config.customRoutes.length) {
    instance.config.customRoutes.forEach(function (route) {
      instance.customRoutes[route.name] = route;
    });
  }
}

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

  Rapid.prototype.boot = function boot() {};

  Rapid.prototype.$setConfig = function $setConfig(configKey, val) {
    this.config[configKey] = val;

    generateRoutes(this);
  };

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