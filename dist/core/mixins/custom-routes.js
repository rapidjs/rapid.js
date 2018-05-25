'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomRoutesMixin = CustomRoutesMixin;

var _customRoute = require('../custom-route');

var _customRoute2 = _interopRequireDefault(_customRoute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Custom Routes
 *
 * These can be defined and passed via the customRoutes config attribute.
 * This allows you to completely override Rapid's usual functionality
 * and use this more like a router.
 */

function CustomRoutesMixin(Rapid) {
  /**
   * Make a request to a route via a given route name
   * The request type depends on the type of request defined in the route
   *
   * @param {String} name
   * @param {Object} routeParams
   * @param {Object} requestParams
   * @return {Promise}
   */
  Rapid.prototype.route = function route() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var routeParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var requestParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var customRoute = this.getCustomRoute(name, routeParams);

    // if there are request params, set them
    if (Object.keys(requestParams).length !== 0) {
      this.withParams(requestParams);
    }

    return this.request(customRoute.type, customRoute.url);
  };

  /**
   * Get a CustomRoute via given name
   *
   * @param {String} name
   * @param {Object} routeParams
   * @return {CustomRoute}
   */
  Rapid.prototype.getCustomRoute = function getCustomRoute() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var routeParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    // if a route exists, return a new instance of CustomRoute
    if (Object.prototype.hasOwnProperty.call(this.customRoutes, name)) {
      return new _customRoute2.default(this.customRoutes[name], {
        routeParams: routeParams
      });
    }

    // to prevent having undefined
    return new _customRoute2.default();
  };

  /**
   * Generate a url to a custom defined route
   * This applies the baseURL and the trailing slash config
   * as well
   *
   * @param {String} name
   * @param {Object} routeParams
   * @return {String}
   */
  Rapid.prototype.generate = function generate() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var routeParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var _getCustomRoute = this.getCustomRoute(name, routeParams),
        url = _getCustomRoute.url;

    return url !== '' ? this.makeUrl(this.config.baseURL, url) : '';
  };
} // @ts-check