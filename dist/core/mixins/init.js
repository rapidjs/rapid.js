'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InitMixin = InitMixin;

var _defaultsDeep = require('lodash/defaultsDeep');

var _defaultsDeep2 = _interopRequireDefault(_defaultsDeep);

var _defaults = require('../../config/defaults');

var _defaults2 = _interopRequireDefault(_defaults);

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

function initializeHttp(instance) {
  instance.http = instance.config.http;
}

function setup(instance) {
  instance.boot();

  sanitizeBaseURL(instance);

  instance.$setConfig('caseSensitive', instance.config.caseSensitive);

  initializeHttp(instance);

  (0, _request.applyCallableRequestMethods)(instance);
}

function InitMixin(Rapid) {
  Rapid.prototype._init = function _init() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    this.config = Object.assign((0, _defaultsDeep2.default)(config, _defaults2.default));
    this.currentRoute = this.config.defaultRoute;
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

  Object.defineProperty(Rapid.prototype, _config.routeTypes.COLLECTION, {
    get: function collection() {
      this.currentRoute = _config.routeTypes.COLLECTION;

      return this;
    }
  });

  Object.defineProperty(Rapid.prototype, _config.routeTypes.MODEL, {
    get: function model() {
      this.currentRoute = _config.routeTypes.MODEL;

      return this;
    }
  });

  Object.defineProperty(Rapid.prototype, _config.routeTypes.ANY, {
    get: function any() {
      this.currentRoute = _config.routeTypes.ANY;

      return this;
    }
  });

  Object.defineProperty(Rapid.prototype, 'default', {
    get: function def() {
      this.currentRoute = this.config.defaultRoute;

      return this;
    }
  });
}