'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomRoutesMixin = CustomRoutesMixin;

var _customRoute = require('../custom-route');

var _customRoute2 = _interopRequireDefault(_customRoute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CustomRoutesMixin(Rapid) {
  Rapid.prototype.route = function route() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var routeParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var requestParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var customRoute = this.getCustomRoute(name, routeParams);

    if (Object.keys(requestParams).length !== 0) {
      this.withParams(requestParams);
    }

    return this.request(customRoute.type, customRoute.url);
  };

  Rapid.prototype.getCustomRoute = function getCustomRoute() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var routeParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (Object.prototype.hasOwnProperty.call(this.customRoutes, name)) {
      return new _customRoute2.default(this.customRoutes[name], {
        routeParams: routeParams
      });
    }

    return new _customRoute2.default();
  };

  Rapid.prototype.generate = function generate() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var routeParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var _getCustomRoute = this.getCustomRoute(name, routeParams),
        url = _getCustomRoute.url;

    return url !== '' ? this.makeUrl(this.config.baseURL, url) : '';
  };
}