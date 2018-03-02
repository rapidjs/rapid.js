"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defaultsDeep = _interopRequireDefault(require("lodash/defaultsDeep"));

var _kebabCase = _interopRequireDefault(require("lodash/kebabCase"));

var _pluralize = _interopRequireDefault(require("pluralize"));

var _routes = require("../declarations/routes");

var _url = require("../utils/url");

var _defaults = _interopRequireDefault(require("./defaults"));

var _debugger = _interopRequireDefault(require("./../debug/debugger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Core =
/*#__PURE__*/
function () {
  function Core(config) {
    _classCallCheck(this, Core);

    Object.defineProperty(this, "config", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "customRoutes", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "currentRoute", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "http", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "requestData", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "routes", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "urlParams", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: void 0
    });
    this.config = Object.assign({}, (0, _defaultsDeep.default)(config, _defaults.default));
    this.currentRoute = this.config.defaultRoute;
    this.customRoutes = [];
    this.requestData = {
      params: {},
      options: {}
    };
    this.routes = this.config.routes;
    this.urlParams = [];
    this.initialize();
  }
  /**
   * Set any config overrides in this method when extending
   */


  _createClass(Core, [{
    key: "boot",
    value: function boot() {}
    /**
     * The order of these are important.
     *
     * boot() will allow overriding any config before we set up
     * the http service and routes.
     *
     * sanitizeBaseURL() will sanitize the baseURL prior to setting up
     * the http service and routes.
     *
     * setRoutes() will set up the current routes (model, collection) and their paths
     */

  }, {
    key: "initialize",
    value: function initialize() {
      this.boot();
      this.sanitizeBaseURL();
      this.setRoutes();
      this.defineCustomRoutes();
      this.initializeHttp();
      this.initializeDebugger();
    }
    /**
     * Initialze the debugger if debug is set to true.
     */

  }, {
    key: "initializeDebugger",
    value: function initializeDebugger() {
      this.debugger = this.config.debug ? new _debugger.default(this) : false;
    }
    /**
     * Initialize the API.
     * consider making an adatper interface to talk to http methods
     */

  }, {
    key: "initializeHttp",
    value: function initializeHttp() {
      var httpConfig = (0, _defaultsDeep.default)({
        baseURL: this.config.baseURL.replace(/\/$/, '')
      }, this.config.httpConfig);
      var http = this.config.http;
      this.http = new http(httpConfig);
    }
    /**
     * Set up the custom routes if we have any
     */

  }, {
    key: "defineCustomRoutes",
    value: function defineCustomRoutes() {
      var _this = this;

      // if we have custom routes, set up a name:route mapping
      if (this.config.customRoutes.length) {
        this.config.customRoutes.forEach(function (route) {
          _this.customRoutes[route.name] = route;
        });
      }
    }
    /**
     * Resets the request data
     */

  }, {
    key: "resetRequestData",
    value: function resetRequestData() {
      this.requestData = {
        params: {},
        options: {}
      };
    }
    /**
     * Reset an URL params set from a relationship
     */

  }, {
    key: "resetURLParams",
    value: function resetURLParams() {
      this.urlParams = [];
    }
    /**
     * Set the routes for the URL based off model/collection and config
     *
     * @param {Route} route The key of the route to be set
     */

  }, {
    key: "setRoute",
    value: function setRoute(route) {
      var newRoute = '';
      var formattedRoute = {
        model: this.config.modelName,
        collection: (0, _pluralize.default)(this.config.modelName),
        any: ''
      };

      if (this.config.routes[route] !== '') {
        newRoute = this.config.routes[route];
      } else {
        newRoute = (0, _kebabCase.default)(formattedRoute[route]).replace(/-/g, this.config.routeDelimeter);

        if (this.config.caseSensitive) {
          newRoute = formattedRoute[route];
        }
      }

      this.routes[route] = newRoute;
    }
    /**
     * Loop through the routes and set them
     */

  }, {
    key: "setRoutes",
    value: function setRoutes() {
      var _this2 = this;

      [_routes.Route.MODEL, _routes.Route.COLLECTION].forEach(function (route) {
        return _this2.setRoute(route);
      });
    }
    /**
     * Sanitize the baseURL before sending it to the http service
     */

  }, {
    key: "sanitizeBaseURL",
    value: function sanitizeBaseURL() {
      this.config.baseURL = (0, _url.sanitizeUrl)(this.config.baseURL, this.config.trailingSlash);
    }
    /**
     * Getters
     */

  }, {
    key: "collection",
    get: function get() {
      this.currentRoute = _routes.Route.COLLECTION;
      return this;
    }
  }, {
    key: "model",
    get: function get() {
      this.currentRoute = _routes.Route.MODEL;
      return this;
    }
  }, {
    key: "any",
    get: function get() {
      this.currentRoute = _routes.Route.ANY;
      return this;
    }
  }]);

  return Core;
}();

var _default = Core;
exports.default = _default;